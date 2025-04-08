"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export function NavPath({
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

export function SidePath({
  href,
  children,
  Sidebar,
}: {
  href: string;
  children: ReactNode;
  Sidebar: () => void;
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
      className={`group hover:scale-105 active:scale-95 transition-all duration-200 px-4 py-3 flex items-center space-x-4 rounded-md group text-slate-400 ${
        isActive
          ? "bg-sidebar-dark-on shadow-md text-white"
          : "hover:bg-sidebar-dark-on hover:shadow-md"
      }`}
      style={{ outline: "none" }}
      onClick={Sidebar}
    >
      {children}
    </Link>
  );
}
