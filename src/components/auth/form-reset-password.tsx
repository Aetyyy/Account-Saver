"use client";

import { useFormState } from "react-dom";
import { resetPassword } from "@/lib/action";
import { ResetPasswordButton } from "@/components/buttons";

export default function FormResetPassword({ token }: { token: string }) {
  const [state, formAction] = useFormState(resetPassword, null);

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    formData.append("token", token);

    await formAction(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      )}
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          placeholder="**********"
          required
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="ConfirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="ConfirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          placeholder="**********"
          required
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.ConfirmPassword}
          </span>
        </div>
      </div>
      <ResetPasswordButton />
    </form>
  );
}
