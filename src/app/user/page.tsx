import UserTable from "@/components/user-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Page",
  description: "User Page",
};

export default function UserPage() {
  return (
    <div className="bg-slate-800 min-h-screen mt-20 overflow-hidden">
      <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto py-24">
        <h1 className="text-2xl font-bold text-white">User List</h1>
        <div className="overflow-x-auto">
          <UserTable />
        </div>
      </div>
    </div>
  );
}
