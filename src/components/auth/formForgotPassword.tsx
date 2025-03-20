"use client";

import { forgotPassword } from "@/lib/action";
import { ForgotPasswordButton } from "@/components/buttons";
import { FormEvent, useState } from "react";
import { Email } from "@/types/forgot.i";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FormForgotPassword() {
  const [, setState] = useState<Email>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleForm = async (evt: FormEvent<HTMLFormElement>) => {
    try {
      evt.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData(evt.currentTarget);
      const data = await forgotPassword(null, formData);

      if (data.status === 404) {
        setState(data as Email);
        await Swal.fire({
          title: "Error",
          text: "Email not found or using another provider.",
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
      } else if (data.status === 200) {
        setState(data as Email);

        try {
          await fetch("/api/pwreset", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
            }),
          });

          const result = await Swal.fire({
            title: "Success",
            text: "Password reset has been sent to your email.",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });

          if (result.isConfirmed) {
            router.push("/login");
          }
        } catch (error) {
          console.error("Error sending reset email:", error);
          throw error; // Re-throw untuk ditangkap catch di luar
        }
      }
    } catch (error) {
      console.error("Error in forgot password flow:", error);
      await Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleForm} method="POST" className="space-y-6">
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
          className="text-white bg-slate-700/90 border border-slate-600 hover:border-slate-800 focus:border-slate-800 focus:outline-none transition-colors duration-300 rounded-lg w-full p-2.5"
          placeholder="john.doe@me.com"
          required
        />
      </div>
      <ForgotPasswordButton isSubmitting={isSubmitting} />
    </form>
  );
}
