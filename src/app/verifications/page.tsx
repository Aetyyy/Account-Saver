import React from "react";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function VerificationPage() {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  if (session.user.verifiedUser === true) {
    return notFound();
  }

  return <div>VerificationPage</div>;
}
