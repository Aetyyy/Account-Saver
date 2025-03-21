"use client";

import { useCallback, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { OptionType } from "@/types/option.i";
import { getData as getCategoryData } from "@/lib/category";
import { getData as getAccountData } from "@/lib/account";
import Link from "next/link";
import AccountTable from "@/components/storage/accountTable";

export default function AccountFilter() {
  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<OptionType>
  >([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  // State untuk mode select
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  // State untuk jumlah akun
  const [accountCount, setAccountCount] = useState<number>(0);

  const handleCategoryChange = useCallback(
    (selected: MultiValue<OptionType>) => {
      setSelectedCategories(selected);
    },
    []
  );

  // Toggle select mode
  const toggleSelectMode = useCallback(() => {
    setIsSelectMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await getCategoryData();
        const mappedOptions = category.data
          ? category.data.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          : [];
        // Opsi tambahan jika tidak ada kategori
        const additionalOption = { value: "No Category", label: "No Category" };
        setOptions([additionalOption, ...mappedOptions]);
      } catch (e) {
        console.error(e);
        setOptions([{ value: "No Category", label: "No Category" }]);
      }
    };

    // Ambil jumlah akun agar tombol Select hanya tampil jika accountCount > 1
    const fetchAccountCount = async () => {
      try {
        const account = await getAccountData();
        if (account.data) {
          setAccountCount(account.data.length);
        }
      } catch (e) {
        console.error(e);
      }
    };

    setIsClient(true);
    fetchCategories();
    fetchAccountCount();
  }, []);

  // Jika total akun kurang dari 1, pastikan mode select dimatikan
  useEffect(() => {
    if (accountCount < 1) {
      setIsSelectMode(false);
    }
  }, [accountCount]);

  return (
    <>
      <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex flex-wrap justify-between items-center gap-4 overflow-hidden">
        <div className="text-white text-2xl font-bold">Account Storage</div>
        <div className="flex flex-row justify-end items-center gap-2">
          <button className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
            <span className="text-white font-semibold">Export Excel</span>
          </button>
          {/* Tampilkan tombol Select hanya jika jumlah akun lebih dari 1 */}
          {accountCount > 1 && (
            <button
              onClick={toggleSelectMode}
              className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
            >
              <span className="text-white font-semibold">
                {isSelectMode ? "Cancel" : "Select"}
              </span>
            </button>
          )}
          <Link
            className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
            href="/storage/add"
            prefetch={true}
          >
            <span className="text-white font-semibold">Add Data</span>
          </Link>
        </div>
      </div>
      <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex items-center">
        <div className="w-full md:w-1/4">
          {isClient && (
            <Select
              isMulti
              options={options}
              onChange={handleCategoryChange}
              placeholder="Filter by Category"
            />
          )}
        </div>
      </div>

      <AccountTable
        selectedCategories={selectedCategories}
        isSelectMode={isSelectMode}
        setSelectMode={setIsSelectMode}
        setAccountCount={setAccountCount}
      />
    </>
  );
}
