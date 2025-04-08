import React from "react";
import { NavPath } from "@/components/navbar/path";
import type { Session } from "next-auth";

export function PageLink({ session }: { session: Session | null }) {
  return (
    <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-navbar-text">
      {session && (
        <>
          <li>
            <NavPath href={"/storage"}>Account</NavPath>
          </li>
          <li>
            <NavPath href={"/category"}>Category</NavPath>
          </li>
          {session.user.role === "admin" ? (
            <li>
              <NavPath href={"/user"}>User</NavPath>
            </li>
          ) : null}
        </>
      )}
    </ul>
  );
}
