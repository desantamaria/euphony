import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import { JWT } from "next-auth/jwt";
import { Buffer } from 'buffer';
import { Session, User } from "next-auth";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-currently-playing",
    "user-modify-playback-state"
].join(",")

let params = {
    scope: scopes
}

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

async function refreshAccessToken(token: JWT): Promise<JWT> {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token")
    params.append("refresh_token", token.refreshToken as string)
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64')
          },
    }); 
    const data = await response.json();
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires:  Date.now() + data.expires_in * 1000
    }
}

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: LOGIN_URL as string,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at as number;
        return token
      }

      // access token has not expired
      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires * 1000) {
        return token
      }

      // acess token expired
      return refreshAccessToken(token)

      return token
    },
    async session({ session, token, user }: { session: Session; token: JWT, user: User }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken as string;
      return session
    }
  }
}

export default NextAuth(authOptions)