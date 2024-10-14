"use client";

import { forgotPassword } from "@/lib/action";
import { ForgotPasswordButton } from "@/components/buttons";
import { FormEvent, useState } from "react";
import { Email } from "@/types/forgot.i";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FormForgotPassword() {
  const [state, setState] = useState<Email>(); // eslint-disable-line
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(evt.currentTarget);

    try {
      const data = await forgotPassword(null, formData);
      if (data.status === 404) {
        setState(data as Email);

        Swal.fire({
          title: "Error",
          text: "Email not found.",
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
      } else if (data.status === 200) {
        setState(data as Email);
        await fetch("/api/pwreset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        });

        Swal.fire({
          title: "Success",
          text: "Password reset has been sent to your email.",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleForm} method="POST" className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          placeholder="john.doe@me.com"
          required
        />
      </div>
      <ForgotPasswordButton isSubmitting={isSubmitting} />
    </form>
  );
}
