"use client";
import { ForgotPasswordButtonProps } from "@/types/forgot.i";
import { useFormStatus } from "react-dom";

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-[#007BFF] font-medium rounded-lg px-5 py-1.5 text-center uppercase transition-colors duration-700 hover:bg-[#0056b3]"
    >
      {pending ? "Registering..." : "Register"}
    </button>
  );
};

export const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-[#007BFF] active:bg-[#007BFF] font-medium rounded-lg px-5 py-1.5 text-center uppercase transition-all duration-300 hover:bg-[#0056b3]"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
};

export const ResetPasswordButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-1.5 text-center uppercase hover:bg-blue-800"
    >
      {pending ? "Resetting..." : "Confirm"}
    </button>
  );
};

export const AddStorageButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-1.5 text-center uppercase hover:bg-blue-800"
    >
      {pending ? "Creating..." : "Confirm"}
    </button>
  );
};

export const ForgotPasswordButton = ({
  isSubmitting,
}: ForgotPasswordButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-1.5 text-center uppercase hover:bg-blue-800"
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
