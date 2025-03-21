"use client";

import React, { useEffect, useState } from "react";
import { getData } from "@/lib/account";
import Loading from "@/components/loading";
import { accountStorage } from "@prisma/client";
import AccountTableClient from "@/components/storage/accountTableClient";
import { MultiValue } from "react-select";
import { OptionType } from "@/types/option.i";

interface AccountTableProps {
  selectedCategories: MultiValue<OptionType>;
  isSelectMode: boolean;
  setSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function AccountTable({
  selectedCategories,
  isSelectMode,
  setSelectMode,
  setAccountCount,
}: AccountTableProps) {
  const [accountData, setAccountData] = useState<accountStorage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getData();
        if (res.data) {
          setAccountData(res.data);
          setAccountCount(res.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setLoading(false);
        setUpdateData(false);
      }
    };

    fetchAccounts();
  }, [updateData, setAccountCount]);

  const filteredAccounts = selectedCategories.length
    ? accountData.filter((acc) =>
        selectedCategories.some(
          (cat) =>
            acc.categoryid === cat.value ||
            (cat.value === "No Category" && !acc.categoryid)
        )
      )
    : accountData;

  return loading ? (
    <Loading />
  ) : filteredAccounts.length > 0 ? (
    <AccountTableClient
      accounts={filteredAccounts}
      setAccountData={setAccountData}
      updateAccount={() => setUpdateData(true)}
      isSelectMode={isSelectMode}
      setAccountCount={setAccountCount}
      setSelectMode={setSelectMode}
    />
  ) : (
    <div className="bg-slate-900/50 py-2 rounded-lg overflow-auto">
      <table className="w-full">
        <thead className="border-b border-gray-100">
          <tr className="*:text-white *:text-left *:text-sm *:px-3 *:py-2">
            <th>No.</th>
            <th>Name</th>
            <th>Account</th>
            <th>Password</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="text-white text-lg font-semibold text-center py-4"
              colSpan={7}
            >
              No Data Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
