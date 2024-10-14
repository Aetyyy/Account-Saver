import FormForgotPassword from "@/components/auth/form-forgot-password";
import React from "react";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="bg-slate-800">
      <div className="flex flex-col items-center justify-between px-6 py-8 pt-56 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-md">
          <div className="p-6">
            <h1 className="text-2xl text-center font-bold text-gray-900">
              Forgot Password
            </h1>
            <Image
              src="/forgotpw.jpg"
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
