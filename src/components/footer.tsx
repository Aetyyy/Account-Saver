"use client";

import React from "react";
import { usePathname } from "next/navigation";
const disablePage = ["/login", "/register", "/forgot-password"];

export default function Footer() {
  const pathname = usePathname();
  if (disablePage.includes(pathname)) {
    return null;
  }

  return (
    <footer className="w-full bg-navbar-light text-white py-4 px-3">
      <div className="container mx-auto max-h-screen flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <p className="text-xs text-gray-400 md:text-sm">
            Copyright 2024 &copy; All Rights Reserved
          </p>
        </div>
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
            <li>
              <a href="/contacts" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li className="mx-4">
              <a href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-gray-400 hover:text-white">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
