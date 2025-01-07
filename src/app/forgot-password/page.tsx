import FormForgotPassword from "@/components/auth/formForgotPassword";
import React from "react";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="bg-slate-800">
      <div className="flex flex-col items-center justify-between px-6 py-8 pt-56 mx-auto h-screen">
        <div className="w-full bg-slate-900/50 rounded-lg shadow mt-0 max-w-md">
          <div className="p-6">
            <h1 className="text-2xl text-center font-bold text-white">
              Forgot Password
            </h1>
            <Image
              src="/forgot.png"
              alt="forgot password"
              width={1280}
              height={1280}
              priority={true}
              className="mx-auto top-0 w-60"
            />
            <FormForgotPassword />
          </div>
        </div>
      </div>
    </div>
  );
}
