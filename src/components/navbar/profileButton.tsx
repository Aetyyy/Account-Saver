"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

interface ProfileButtonProps {
  session: any;
}

export function ProfileButton({ session }: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* Desktop View */}
      <div className="md:flex gap-3 items-center hidden">
        <div className="flex flex-col justify-center -space-y-1">
          <span className="font-semibold text-slate-200 text-right capitalize">
            {session.user.name}
          </span>
          <span className="font-xs text-slate-400 text-right capitalize">
            {session.user.role}
          </span>
        </div>
      </div>
      <div ref={profileRef}>
        {/* Button */}
        <button
          type="button"
          className="text-sm bg-gray-100 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={session.user.image || "/avatar.png"}
            alt="avatar"
            width={512}
            height={512}
            priority
            draggable={false}
            className="max-w-10 h-10 rounded-full select-none"
          />
        </button>
        {/* Dropdown */}
        <div className="absolute bottom-[13.5rem] md:relative md:flex md:justify-center md:items-center md:top-3">
          <div
            className={`absolute w-60 px-5 py-3 bg-gray-800 rounded-lg shadow border border-transparent top-3 transform transition-all duration-500 ease-out ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div
              className={`transition duration-300 ease-out ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <ul className="space-y-3 dark:text-white">
                <li className="font-medium">
                  <a
                    href="#"
                    className="group flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-3 text-white group-hover:text-slate-300">
                      <FiUsers className="w-6 h-6" />
                    </div>
                    <span className="text-white group-hover:text-slate-300">
                      Accounts
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a
                    href="#"
                    className="group flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-3 text-white group-hover:text-slate-300">
                      <IoSettingsOutline className="w-6 h-6" />
                    </div>
                    <span className="text-white group-hover:text-slate-300">
                      Settings
                    </span>
                  </a>
                </li>
                <hr className="dark:border-gray-700" />
                <li className="font-medium">
                  <button
                    type="button"
                    onClick={() => signOut({ redirectTo: "/login" })}
                    className="group flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600 pr-[6.5rem]"
                  >
                    <div className="mr-3 text-red-600 group-hover:text-red-500">
                      <TbLogout className="w-6 h-6" />
                    </div>
                    <span className="text-white group-hover:text-slate-300">
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden items-center flex">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-200 text-left capitalize">
            {session.user.name}
          </span>
          <span className="font-xs text-slate-400 text-left capitalize">
            {session.user.role}
          </span>
        </div>
      </div>
    </>
  );
}
