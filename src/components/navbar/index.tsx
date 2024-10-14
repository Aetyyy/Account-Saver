import Link from "next/link";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { auth } from "@/auth";

const DynamicHeaderAuth = dynamic(() => import("./dynamic-nav"), {
  ssr: false,
});

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-navbar-light border-b border-navbar-border z-40 fixed w-full top-0">
      <div className="max-w-screen-xl flex items-center justify-between container mx-auto p-4">
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={1000}
            height={1000}
            priority
            className="cursor-pointer max-w-12 h-12"
          />
          <h1 className="hidden sm:block text-lg font-bold text-white">
            Account Saver
          </h1>
        </Link>
        <DynamicHeaderAuth session={session} />
      </div>
    </nav>
  );
}
