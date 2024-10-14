// "use client";
import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { User, Datasemen } from "@/components/dashboard/datasemen";
import {
  getAccountCount,
  getAdminCount,
  getOnlineCount,
  getUserOnline,
  getUsersCount,
} from "@/lib/data";

export default async function Dashboard() {
  const session = await auth();
  const accountCount: number = (await getAccountCount()) || 0;
  const usersCount: number = (await getUsersCount()) || 0;
  const adminCount: number = (await getAdminCount()) || 0;
  const onlineCount: number = (await getOnlineCount()) || 0;
  const userOnline = await getUserOnline();

  // useEffect(() => {

  // }, []);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="bg-slate-800">
        <div className="max-w-screen-xl mx-auto py-24 p-4">
          <h1 className="text-2xl text-white">Dashboard</h1>
          <h2 className="text-xl text-white">
            Welcome Back: <span className="font-bold">{session.user.name}</span>
          </h2>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-4 flex gap-4 flex-col md:flex-row text-white">
        <div className="w-full">
          <div className="flex gap-4 justify-between">
            <Datasemen type="account" total={accountCount} />
            <Datasemen type="users" total={usersCount} />
            <Datasemen type="admin" total={adminCount} />
            <Datasemen type="online" total={onlineCount} />
            <User type="user" memek={userOnline} />
          </div>
        </div>
      </div>
    </>
  );
}
