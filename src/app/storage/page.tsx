import AccountFilter from "@/components/storage/accountFilter";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="mt-[100px] px-4 min-h-screen">
      <div className="max-w-screen-2xl mx-auto py-10 flex flex-col gap-6">
        <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex flex-wrap justify-between items-center gap-4 overflow-hidden">
          <div className="text-white text-base sm:text-2xl font-bold">
            Account Storage
          </div>
          <div className="flex flex-row justify-end items-center gap-2">
            <button className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
              <span className="text-white font-semibold text-sm sm:text-base">
                Export Excel
              </span>
            </button>
            <Link
              className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
              href={"/storage/add"}
              prefetch={true}
            >
              <span className="text-white font-semibold">Add Data</span>
            </Link>
          </div>
        </div>
        <AccountFilter />
      </div>
    </div>
  );
}
