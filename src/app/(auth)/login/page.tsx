import FormLogin from "@/components/auth/formLogin";
import { GithubButton, GoogleButton } from "@/components/auth/socialButton";
import { Metadata } from "next";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Account Saver | Sign In",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const params = searchParams?.error;

  return (
    // Gunakan flex, min-h-screen, justify-between, dan items-center
    <div className="flex flex-col justify-between items-center p-6 overflow-hidden">
      {/* Bagian Atas (Form + Tombol Sosial) */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex mb-4">
          <Link href={"/"}>
            <BiArrowBack className="w-4 h-4 m-2 text-slate-300" />
          </Link>
          <h1 className="text-xl font-bold mx-1 text-white">
            Sign In to your account
          </h1>
        </div>

        {/* Error OAuthAccountNotLinked */}
        {params === "OAuthAccountNotLinked" && (
          <div
            className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
            role="alert"
          >
            <span className="font-medium">
              Account already used by another provider.
            </span>
          </div>
        )}

        <FormLogin />

        {/* Atau (Separator) */}
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 text-center font-semibold text-slate-500">Or</p>
        </div>

        {/* Tombol Sosial */}
        <div className="space-y-2 mt-1">
          <GoogleButton />
          <GithubButton />
        </div>
      </div>

      {/* Bagian Bawah (Teks "Don't have an account?") */}
      <div className="text-center mt-4 text-sm font-light text-slate-300">
        <p>
          Don&apos;t have an account?
          <Link href={"/register"}>
            <span className="font-medium pl-1 text-[#007BFF] hover:text-[#0056b3]">
              Sign Up here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
