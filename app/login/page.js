"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <Button
        className="bg-green-500 hover:bg-green-600"
        onClick={() => {
          signIn("spotify", { callbackUrl: "/" });
        }}
      >
        Log in with Spotify
      </Button>
    </div>
  );
};

export default Login;
