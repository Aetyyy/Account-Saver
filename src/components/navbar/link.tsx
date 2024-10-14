import Link from "next/link";
import React from "react";

export function PageLink({ session }: any) {
  return (
    <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-navbar-text">
      <li>
        <Link href={"/"} className="hover:text-navbar-hover-text">
          Home
        </Link>
      </li>
      <li>
        <Link href={"/about"} className="hover:text-navbar-hover-text">
          About
        </Link>
      </li>
      {session && (
        <>
          <li>
            <Link href={"/dashboard"} className="hover:text-navbar-hover-text">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/storage"} className="hover:text-navbar-hover-text">
              Account
            </Link>
          </li>
          {session.user.role === "admin" ? (
            <li>
              <Link href={"/user"} className="hover:text-navbar-hover-text">
                User
              </Link>
            </li>
          ) : null}
        </>
      )}
    </ul>
  );
}
