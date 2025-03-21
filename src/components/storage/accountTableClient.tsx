import React, { useState, useMemo } from "react";
import { decryptPass, formatDate, formatDateSM } from "@/lib/utils";
import Link from "next/link";
import { deleteData } from "@/lib/account";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Account, AccountData } from "@/types/storage.i";

type SetAccountDataType = React.Dispatch<React.SetStateAction<AccountData[]>>;

interface AccountTableClientProps {
  accounts: Account[];
  setAccountData: SetAccountDataType;
  updateAccount: () => void;
  isSelectMode: boolean;
  setAccountCount: React.Dispatch<React.SetStateAction<number>>;
  setSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountTableClient({
  accounts,
  setAccountData,
  updateAccount,
  isSelectMode,
  setAccountCount,
  setSelectMode,
}: AccountTableClientProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [inputPage, setInputPage] = useState("");
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  // Sorting state: default sorting berdasarkan 'title'
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Account | null;
    direction: "asc" | "desc";
  }>({ key: "title", direction: "asc" });

  const handleSort = (key: keyof Account) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    const sortableData = [...accounts];
    if (sortConfig.key !== null) {
      const key = sortConfig.key;
      sortableData.sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;
        if (key === "createdat") {
          aValue = new Date(a.createdat).getTime();
          bValue = new Date(b.createdat).getTime();
        } else if (key === "category") {
          aValue = a.category?.name?.toLowerCase() || "";
          bValue = b.category?.name?.toLowerCase() || "";
        } else if (a[key] !== undefined && b[key] !== undefined) {
          aValue = a[key]?.toString().toLowerCase() ?? "";
          bValue = b[key]?.toString().toLowerCase() ?? "";
        } else {
          aValue = "";
          bValue = "";
        }
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [accounts, sortConfig]);

  const currentPageData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // State untuk mode select dan ID yang dipilih
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Toggle select baris individu
  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle select semua baris di halaman ini
  const toggleSelectAll = () => {
    const currentPageIds = currentPageData.map((acc) => acc.id);
    const allSelected = currentPageIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        currentPageIds.forEach((id) => newSet.delete(id));
      } else {
        currentPageIds.forEach((id) => newSet.add(id));
      }
      return newSet;
    });
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert deletion of selected items!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      const deletePromises = Array.from(selectedIds).map((id) =>
        deleteData({ id })
      );
      await Promise.all(deletePromises);

      setAccountData((prev) => {
        const newData = prev.filter((acc) => !selectedIds.has(acc.id));
        // Update jumlah akun di parent
        setAccountCount(newData.length);
        const newTotalPage = Math.ceil(newData.length / itemsPerPage);
        if (currentPage > newTotalPage && newTotalPage > 0) {
          setCurrentPage(newTotalPage);
        }
        if (newData.length === 0) {
          setCurrentPage(1);
        }
        return newData;
      });

      updateAccount();
      setSelectedIds(new Set());
      // Matikan mode select setelah penghapusan
      setSelectMode(false);

      await Swal.fire({
        title: "Deleted!",
        text: "Selected items have been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Delete satuan
  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
      if (result.isConfirmed) {
        await deleteData({ id });
        setAccountData((prev) => {
          const newData = prev.filter((acc) => acc.id !== id);
          setAccountCount(newData.length);
          const newTotalPage = Math.ceil(newData.length / itemsPerPage);
          if (currentPage > newTotalPage) {
            setCurrentPage(newTotalPage);
          }
          return newData;
        });
        updateAccount();
        await Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // Matikan mode select jika terjadi penghapusan satuan
        setSelectMode(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(text);
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Copied!",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Copied!",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Failed to copy!",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <div className="bg-slate-900/50 py-4 rounded-lg overflow-auto">
        <table className="bg-slate-700 mt-3 min-w-full">
          <thead className="border-b border-gray-600">
            <tr className="text-white *:py-3 *:px-2 *:text-sm *:text-left">
              {/* Jika mode select aktif, tampilkan checkbox check-all */}
              {isSelectMode && (
                <th>
                  <input
                    type="checkbox"
                    checked={
                      currentPageData.length > 0 &&
                      currentPageData.every((acc) => selectedIds.has(acc.id))
                    }
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
              )}
              <th>No.</th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Name{" "}
                {sortConfig.key === "title"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("account")}
              >
                Account{" "}
                {sortConfig.key === "account"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("password")}
              >
                Password{" "}
                {sortConfig.key === "password"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description{" "}
                {sortConfig.key === "description"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("category" as keyof Account)}
              >
                Category{" "}
                {sortConfig.key === "category"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("createdat")}
              >
                Created At{" "}
                {sortConfig.key === "createdat"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((acc: Account, index: number) => (
              <tr key={acc.id} className="text-slate-200">
                {isSelectMode && (
                  <td className="py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(acc.id)}
                      onChange={() => toggleSelectRow(acc.id)}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                <td className="py-3 px-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-3 px-2">{acc.title}</td>
                <td
                  className="py-3 px-2 cursor-pointer"
                  onClick={() => handleCopy(acc.account)}
                >
                  {acc.account}
                </td>
                <td
                  className="py-3 px-2 cursor-pointer"
                  onClick={async () =>
                    handleCopy(await decryptPass(acc.password))
                  }
                >
                  {decryptPass(acc.password)}
                </td>
                <td className="py-3 px-2">
                  {acc.description || "No Description"}
                </td>
                <td className="py-3 px-2">
                  {acc.category?.name || "No Category"}
                </td>
                <td className="py-3 px-2 hidden xl:table-cell">
                  {formatDate(acc.createdat.toISOString())}
                </td>
                <td className="py-3 px-2 xl:hidden">
                  {formatDateSM(acc.createdat.toISOString())}
                </td>
                <td className="flex gap-2 py-3 px-2">
                  <Link
                    href={`/storage/edit/${acc.id}`}
                    className="bg-green-500 hover:bg-green-600 py-2 px-3 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(acc.id)}
                    className="bg-red-500 hover:bg-red-600 py-2 px-3 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tombol Bulk Delete */}
      {isSelectMode && selectedIds.size > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold uppercase transition-all"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 bg-slate-700 p-4 rounded-lg shadow-md overflow-auto">
        <div className="text-slate-200 text-sm mb-2 sm:mb-0">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, accounts.length)} of{" "}
          {accounts.length} entries
        </div>
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="bg-slate-600 hover:bg-slate-500 text-white px-2 md:px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          {totalPages > 3 ? (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === 1
                    ? "bg-blue-500 text-white"
                    : "bg-slate-600 text-slate-200 hover:bg-slate-500"
                }`}
              >
                1
              </button>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={inputPage === "" ? String(currentPage) : inputPage}
                  min={1}
                  max={totalPages}
                  onChange={(e) => setInputPage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const page = Math.min(
                        Math.max(1, parseInt(inputPage)),
                        totalPages
                      );
                      setCurrentPage(page);
                      setInputPage("");
                    }
                  }}
                  className="w-12 md:w-16 px-2 py-1 text-center bg-slate-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                  placeholder={String(currentPage)}
                />
              </div>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-slate-600 text-slate-200 hover:bg-slate-500"
                }`}
              >
                {totalPages}
              </button>
            </>
          ) : (
            Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-slate-600 text-slate-200 hover:bg-slate-500"
                }`}
              >
                {i + 1}
              </button>
            ))
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-2 md:px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
