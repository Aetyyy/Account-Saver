"use client";
import { getData } from "@/lib/account";
import AccountTableClient from "@/components/storage/accountTableClient";
import { useEffect, useMemo, useState } from "react";
import { accountStorage } from "@prisma/client";
import Loading from "@/components/loading";
import { MultiValue } from "react-select";
import { OptionType } from "@/types/option.i";

interface AccountTableProps {
  category: MultiValue<OptionType>;
}

export default function AccountTable({ category }: AccountTableProps) {
  const [accountData, setAccountData] = useState<accountStorage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const account = await getData();
        if (account.data) {
          setAccountData(account.data);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setLoading(false);
        setUpdateData(false);
      }
    };

    if (loading || updateData) {
      fetchAccounts();
    }
  }, [loading, updateData]);

  const filteredAccounts = useMemo(() => {
    return category.length
      ? accountData.filter((acc) =>
          category.some(
            (cat) =>
              acc.categoryid === cat.value ||
              (cat.value === "No Category" && !acc.categoryid)
          )
        )
      : accountData;
  }, [accountData, category]);

  return loading ? (
    <Loading />
  ) : filteredAccounts.length > 0 ? (
    <AccountTableClient
      accounts={filteredAccounts}
      setAccountData={setAccountData}
      updateAccount={() => setUpdateData(true)}
    />
  ) : (
    <div className="bg-slate-900/50 py-2 rounded-lg overflow-auto">
      <table className="w-full ">
        <thead className="border-b border-gray-100">
          <tr className="*:text-white *:py-3 *:px-6 *:text-left *:text-sm">
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
