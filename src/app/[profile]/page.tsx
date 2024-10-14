import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Profile({
  params,
}: {
  params: { profile: string };
}) {
  const user = await prisma.user.findUnique({
    where: {
      name: params.profile,
    },
  });

  if (!user) {
    return notFound();
  }

  return <div>{user.name}</div>;
}
