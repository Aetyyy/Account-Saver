"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ProfileButton } from "@/components/navbar/button";
import { PageLink } from "@/components/navbar/link";

export default function DynamicNav({ session }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <PageLink session={session} />
      </div>
      <div className="hidden sm:flex items-center gap-3">
        {session ? (
          <div className="flex gap-3 items-center">
            <div className="flex flex-col justify-center -space-y-1">
              <span className="font-semibold text-slate-200 text-right capitalize">
                {session.user.name}
              </span>
              <span className="font-xs text-slate-400 text-right capitalize">
                {session.user.role}
              </span>
            </div>
            <ProfileButton
              Avatar={session.user.image as string}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        ) : (
          <>
            <Link
              href={"/login"}
              className="hidden sm:block bg-button-light text-white px-4 py-2 rounded-md hover:bg-button-hover transition-colors duration-500"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="hidden sm:block bg-[#0056b3] text-white px-4 py-2 rounded-md hover:bg-button-light transition-colors duration-500"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </>
  );
}
