import FormResetPassword from "@/components/auth/formResetPassword";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

export default async function ForgotPassword({
  params,
}: {
  params: { token: string };
}) {
  const token = await prisma.passwordToken.findUnique({
    where: {
      token: params.token,
    },
  });

  if (!token) {
    return notFound();
  }

  return (
    <div className="bg-slate-800">
      <div className="flex flex-col items-center justify-between px-6 py-8 pt-56 mx-auto h-screen">
        <div className="w-full bg-slate-900/50 rounded-lg shadow mt-0 max-w-md">
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-white">
              Reset your password
            </h1>
            <FormResetPassword token={params.token} />
          </div>
        </div>
      </div>
    </div>
  );
}
