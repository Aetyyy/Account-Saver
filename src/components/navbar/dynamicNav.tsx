"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ProfileButton } from "@/components/navbar/profileButton";
import { PageLink } from "@/components/navbar/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import {
  MdDashboard,
  MdOutlineAccountCircle,
  MdOutlineStorage,
} from "react-icons/md";
import { PiUsersDuotone } from "react-icons/pi";

export default function DynamicNav({ session }: any) {
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
              priority
              className="cursor-pointer max-w-12 h-12"
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
      </div>
      {/* {sidebar && ( */}
      <aside
        ref={sidebarRef}
        className={`${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } absolute mx-auto container z-40 top-0 pb-2 px-4 w-full flex flex-col justify-between h-screen border-r bg-sidebar-dark transition-all duration-700 ease-in-out sm:w-6/12 md:hidden overflow-hidden`}
      >
        <div>
          <div className="-mx-6 px-6 py-4 border-b-white border-b flex">
            <button onClick={() => setSidebar(!sidebar)}>
              <IoClose
                className={`${
                  sidebar ? "rotate-180" : "rotate-0"
                } w-8 h-8 mr-4 ml-2 md:hidden text-white transition-transform duration-300 ease-in-out`}
              />
            </button>
            <Link href="#" title="home" className="flex flex-none">
              <Image
                src="/logo.png"
                className="w-12"
                alt="Logo"
                width={1000}
                height={1000}
                priority
              />
              <span className="text-white font-bold text-lg pt-3 mx-3 line-clamp-1 text-pretty">
                Account Saver
              </span>
            </Link>
          </div>
          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <Link
                href="/"
                aria-label="home"
                className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              >
                <AiOutlineHome className="h-6 w-6 text-white" />
                <span className="-mr-1 font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                aria-label="about"
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
              >
                <IoInformationCircleOutline className="h-6 w-6 text-gray-700" />
                <span className="group-hover:text-gray-700">About</span>
              </Link>
            </li>
            {session && (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    aria-label="dashboard"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
                  >
                    <MdDashboard className="h-6 w-6 text-gray-700" />
                    <span className="group-hover:text-gray-700">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    aria-label="account"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
                  >
                    <MdOutlineAccountCircle className="h-6 w-6 text-gray-700" />
                    <span className="group-hover:text-gray-700">Account</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/storage"
                    aria-label="storage"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
                  >
                    <MdOutlineStorage className="h-6 w-6 text-gray-700" />
                    <span className="group-hover:text-gray-700">Storage</span>
                  </Link>
                </li>
                {session.user.role === "admin" ? (
                  <li>
                    <Link
                      href="/user"
                      aria-label="user"
                      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
                    >
                      <PiUsersDuotone className="h-6 w-6 text-gray-700" />
                      <span className="group-hover:text-gray-700">Users</span>
                    </Link>
                  </li>
                ) : null}
              </>
            )}
          </ul>
        </div>
        <div className="px-6 -mx-4 pt-4 flex items-center border-t gap-3">
          {session && <ProfileButton session={session} />}
        </div>
      </aside>
    </>
  );
}
