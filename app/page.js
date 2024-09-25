"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  //   const { data: session } = useSession();
  //   console.log(session);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center"></div>
  );
}
