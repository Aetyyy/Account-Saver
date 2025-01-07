"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function Path({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const cleanHref = href.replace(/#/, "");

  const isActive =
    (cleanHref === "/" && pathname === "/") ||
    (cleanHref !== "/" && pathname.startsWith(cleanHref));

  return (
    <Link
      prefetch={true}
      href={href}
      className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px font-medium transition-colors duration-200 ease-out ${
        isActive
          ? "border-slate-600 text-slate-600"
          : "border-transparent text-slate-300 hover:border-slate-600 hover:text-slate-600"
      }`}
      style={{ outline: "none" }}
    >
      {children}
    </Link>
  );
}
