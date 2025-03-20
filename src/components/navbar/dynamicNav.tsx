"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ProfileButton } from "@/components/navbar/profileButton";
import { PageLink } from "@/components/navbar/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { MdOutlineStorage } from "react-icons/md";
import { PiUsersDuotone } from "react-icons/pi";
import type { Session } from "next-auth";
import { BiCategory } from "react-icons/bi";

export default function DynamicNav({ session }: { session: Session | null }) {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="max-w-screen-xl flex items-center justify-between container mx-auto p-4 px-4">
        <div className="flex">
          <button onClick={() => setSidebar(!sidebar)}>
            <RxHamburgerMenu className="w-8 h-8 mr-4 ml-2 md:hidden text-white" />
          </button>
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={1000}
              height={1000}
              draggable={false}
              priority
              className="cursor-pointer max-w-12 h-12 select-none"
            />
            <h1 className="flex flex-none text-lg font-bold text-white">
              Account Saver
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <PageLink session={session} />
        </div>
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <ProfileButton session={session} />
          ) : (
            <>
              <Link
                href={"/login"}
                className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:scale-105 active:bg-blue-600 active:scale-95 transition-transform duration-300"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="hidden sm:block bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 active:bg-blue-800 active:scale-95 transition-transform duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {/* sidebar */}
      <aside
        ref={sidebarRef}
        className={`
        ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } fixed z-40 top-0 left-0 w-full sm:w-6/12 md:hidden
        h-screen bg-sidebar-dark-bg border-r
        flex flex-col justify-between
        transition-all duration-700 ease-in-out
      `}
      >
        {/* Bagian Atas (konten scrollable) */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Sidebar */}
          <div className="flex items-center px-6 py-4 border-b border-b-white">
            <button onClick={() => setSidebar(!sidebar)}>
              <IoClose
                className={`${
                  sidebar ? "rotate-180" : "rotate-0"
                } w-8 h-8 mr-4 text-white transition-transform duration-300 ease-in-out`}
              />
            </button>
            <Link href="#" title="home" className="flex items-center">
              <Image
                src="/logo.png"
                className="w-12"
                alt="Logo"
                width={1000}
                height={1000}
                priority
              />
              <span className="text-white font-bold text-lg ml-3 line-clamp-1">
                Account Saver
              </span>
            </Link>
          </div>

          {/* Menu Sidebar */}
          <ul className="space-y-2 tracking-wide mt-6 px-4">
            {session && (
              <>
                <li>
                  <Link
                    href="/storage"
                    aria-label="storage"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-slate-400 group bg-sidebar-dark-on hover:bg-gray-200 transition-colors"
                    onClick={() => setSidebar(false)}
                  >
                    <MdOutlineStorage className="h-6 w-6 text-slate-400" />
                    <span>Storage</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category"
                    aria-label="category"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-slate-400 group bg-sidebar-dark-on hover:bg-gray-200 transition-colors"
                    onClick={() => setSidebar(false)}
                  >
                    <BiCategory className="h-6 w-6 text-slate-400" />
                    <span>Category</span>
                  </Link>
                </li>
                {session.user.role === "admin" && (
                  <li>
                    <Link
                      href="/user"
                      aria-label="user"
                      className="px-4 py-3 flex items-center space-x-4 rounded-md text-slate-400 group bg-sidebar-dark-on hover:bg-gray-200 transition-colors"
                      onClick={() => setSidebar(false)}
                    >
                      <PiUsersDuotone className="h-6 w-6 text-slate-400" />
                      <span>Users</span>
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Bagian Bawah (tetap terlihat) */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3">
          {session ? (
            <ProfileButton session={session} />
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:scale-105 active:bg-blue-600 active:scale-95 transition-transform duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 active:bg-blue-800 active:scale-95 transition-transform duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
