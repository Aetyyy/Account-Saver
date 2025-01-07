import Link from "next/link";
import React from "react";
import FormPage from "@/components/account/editForm";

export default async function EditAccountPage({
  AccountId,
}: {
  AccountId: string;
}) {
  return (
    <div className="mt-[100px] min-h-screen">
      <div className="max-w-screen-2xl mx-auto py-10 flex flex-col gap-6">
        <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex flex-wrap justify-between items-center gap-4">
          <div className="text-white text-2xl font-bold">Edit Account</div>
          <div className="flex flex-row justify-end items-center gap-2">
            <Link
              className="bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-lg"
              href={"/storage"}
            >
              <span className="text-white font-semibold">Back</span>
            </Link>
          </div>
        </div>
        <div className="bg-slate-900/50 px-8 py-4 rounded-2xl flex flex-col w-full justify-between items-center gap-4">
          <FormPage AccountId={AccountId} />
        </div>
      </div>
    </div>
  );
}
