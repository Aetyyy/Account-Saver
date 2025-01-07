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
    <div className="p-6 space-y-2 overflow-hidden">
      <div className="flex">
        <Link href={"/"}>
          <BiArrowBack className="w-4 h-4 mt-3 text-slate-300" />
        </Link>
        <h1 className="text-2xl font-bold mx-1 text-white flex flex-none">
          Sign In to your account
        </h1>
      </div>
      {params === "OAuthAccountNotLinked" ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">
            Account already use by other provider.
          </span>
        </div>
      ) : null}
      <FormLogin />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
      </div>
      <GoogleButton />
      <GithubButton />
    </div>
  );
}
