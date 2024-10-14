import FormRegister from "@/components/auth/form-register";
import React from "react";

export default function Register() {
  return (
    <div className="p-6 space-y-4 overflow-hidden">
      <h1 className="text-2xl font-bold text-white">Create an Account</h1>
      <FormRegister />
    </div>
  );
}
