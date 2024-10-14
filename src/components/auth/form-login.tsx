"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { signInCredentials } from "@/lib/action";
import { LoginButton } from "@/components/buttons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormLogin() {
  const [state, formAction] = useFormState(signInCredentials, null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action={formAction}>
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className="bg-[#41729F] border border-[#CED4DA] hover:border-[#74C0FC] focus:border-[#74C0FC] outline-none transition-colors duration-300 text-[#6C757D] rounded-lg w-full p-2.5"
          placeholder="Masukkan email anda"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error && (
              <div
                className="mb-4 text-sm text-red-500 rounded-lg"
                role="alert"
              >
                {state.error.email && (
                  <div>
                    {state.error.email.map((msg, idx) => (
                      <p key={idx}>{msg}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="my-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-white"
        >
          Password
        </label>
        <div className="relative overflow-hidden">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            name="password"
            className="bg-white border border-[#CED4DA] hover:border-[#74C0FC] focus:border-[#74C0FC] outline-none transition-colors duration-300 text-[#6C757D] rounded-lg w-full p-2.5"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute py-4 right-0 items-center outline-none px-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <div className="relative w-4 h-4">
              <FaEyeSlash
                className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
                  showPassword
                    ? "opacity-0 rotate-100 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <FaEye
                className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
                  showPassword
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-100 scale-0"
                }`}
              />
            </div>
          </button>
        </div>
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error && (
              <div
                className="mb-4 text-sm text-red-500 rounded-lg"
                role="alert"
              >
                {state.error.password && (
                  <div>
                    {state.error.password.map((msg, idx) => (
                      <p key={idx}>{msg}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </span>
        </div>
      </div>
      <LoginButton />
      <div className="mt-1 text-xs font-light text-gray-500">
        <Link href={"/forgot-password"}>
          <span className="font-medium text-[#007BFF] hover:text-[#0056b3]">
            Forgot Password?
          </span>
        </Link>
      </div>
      <p className="mt-4 text-sm font-light text-slate-300">
        Dont&apos;t have an account?
        <Link href={"/register"}>
          <span className="font-medium pl-1 text-[#007BFF] hover:text-[#0056b3]">
            Sign Up here
          </span>
        </Link>
      </p>
    </form>
  );
}
