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
    <div className="bg-slate-900/50 rounded-lg shadow-xl p-6">
      <h1 className="text-2xl font-bold text-white">Reset your password</h1>
      <FormResetPassword token={params.token} />
    </div>
  );
}
