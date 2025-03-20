import FormRegister from "@/components/auth/formRegister";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

export default function Register() {
  return (
    <div className="p-6 space-y-2 overflow-hidden">
      <div className="flex">
        <Link href={"/"}>
          <BiArrowBack className="w-4 h-4 mt-3 text-slate-300" />
        </Link>
        <h1 className="text-2xl font-bold mx-1 flex flex-none text-white">
          Create an Account
        </h1>
      </div>
      <FormRegister />
    </div>
  );
}
