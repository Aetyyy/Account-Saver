import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditAccountPage from "@/components/account/editPage";

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = await prisma.accountStorage.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!id) {
    return notFound();
  }

  return (
    <div className="mt-20">
      <EditAccountPage AccountId={params.id} />
      <div className="">{params.id}</div>
    </div>
  );
}
