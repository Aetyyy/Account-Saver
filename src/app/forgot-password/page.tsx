import FormForgotPassword from "@/components/auth/formForgotPassword";
import React from "react";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="p-6 bg-slate-900/50 rounded-lg shadow-xl">
      <h1 className="text-2xl text-center font-bold text-white">
        Forgot Password
      </h1>
      <Image
        src="/forgot.png"
        alt="forgot password"
        width={1280}
        height={1280}
        priority={true}
        draggable={false}
        className="mx-auto w-60"
      />
      <FormForgotPassword />
    </div>
  );
}
