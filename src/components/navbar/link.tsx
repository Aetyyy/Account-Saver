import React from "react";
import ActivePath from "@/components/navbar/path";

export function PageLink({ session }: any) {
  return (
    <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-navbar-text">
      <li>
        <ActivePath href={"/"}>Home</ActivePath>
      </li>
      <li>
        <ActivePath href={"/#about"}>About</ActivePath>
      </li>
      {session && (
        <>
          <li>
            <ActivePath href={"/storage"}>Account</ActivePath>
          </li>
          <li>
            <ActivePath href={"/category"}>Category</ActivePath>
          </li>
          {session.user.role === "admin" ? (
            <li>
              <ActivePath href={"/user"}>User</ActivePath>
            </li>
          ) : null}
        </>
      )}
    </ul>
  );
}
