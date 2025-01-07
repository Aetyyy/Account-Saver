"use client";
import { getData } from "@/lib/account";
import AccountTableClient from "@/components/storage/accountTableClient";
import { useEffect, useState } from "react";
import { accountStorage } from "@prisma/client";
import Loading from "@/components/loading";
import { MultiValue } from "react-select";
import { OptionType } from "@/types/option.i";

interface AccountTableProps {
  category: MultiValue<OptionType>;
}

export default function AccountTable({ category }: AccountTableProps) {
  const [accountData, setAccountData] = useState<
    (accountStorage & { category: { name: string } | null })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      try {
        const account = await getData();
        if (account.data) {
          setAccountData(account.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    const updateAccount = async () => {
      try {
        const account = await getData();
        if (account.data) {
          setAccountData(account.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setUpdateData(false);
      }
    };

    getAccount();

    if (updateData) {
      updateAccount();
    }
  }, [category, updateData]);

  const filterCategory =
    category.length > 0
      ? accountData.filter((acc) =>
          category.some(
            (cat) =>
              acc.categoryid === cat.value ||
              (cat.value === "No Category" && !acc.category)
          )
        )
      : accountData;

  return loading ? (
    <Loading />
  ) : filterCategory.length > 0 ? (
    <AccountTableClient
      accounts={filterCategory}
      setAccountData={setAccountData}
      updateAccount={() => setUpdateData(true)}
    />
  ) : (
    <table className="w-full">
      <thead className="border-b border-gray-100">
        <tr className="*:text-white *:py-3 *:px-6 *:text-left *:text-sm">
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
            colSpan={6}
          >
            No Data Found
          </td>
        </tr>
      </tbody>
    </table>
  );
}
