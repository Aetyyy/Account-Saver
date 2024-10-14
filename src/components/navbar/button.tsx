"use client";

import Image from "next/image";
import DropdownProfile from "@/components/dropdown";

interface ProfileButtonProps {
  Avatar: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ProfileButton({
  Avatar,
  isOpen,
  setIsOpen,
}: ProfileButtonProps) {
  return (
    <div>
      <button
        type="button"
        className="text-sm bg-gray-100 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={Avatar || "/avatar.png"}
          alt="avatar"
          width={512}
          height={512}
          priority
          className="max-w-10 h-10 rounded-full"
        />
      </button>
      {isOpen && <DropdownProfile isOpen={isOpen}/>}
    </div>
  );
}
