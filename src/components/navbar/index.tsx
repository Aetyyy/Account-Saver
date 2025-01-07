// components/navbar/index.tsx
import React from "react";
import dynamic from "next/dynamic";
import type { Session } from "next-auth";

const DynamicHeaderAuth = dynamic(
  () => import("@/components/navbar/dynamicNav"),
  {
    ssr: false,
  }
);

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-navbar-light border-b border-navbar-border z-30 fixed w-full top-0">
      <DynamicHeaderAuth session={session} />
    </nav>
  );
}
