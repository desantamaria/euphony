"use client";

import Image from "next/image";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Button className="bg-green-500 hover:bg-green-600">
        Log in with Spotify
      </Button>
    </div>
  );
}
