import { deleteData } from "@/lib/category"; // Fungsi delete satuan
import { formatDate, formatDateSM } from "@/lib/utils";
import { category } from "@prisma/client";
import React, { useState, useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

interface CategoryTableDataProps {
  category: category[];
  updateCategory: () => void;
  setCategoryData: React.Dispatch<React.SetStateAction<category[]>>;
  onEdit: (category: category) => void;
  onToggleSelect: () => void; // Toggle mode select
  isSelectMode: boolean; // Apakah checkbox perlu ditampilkan
}

export default function CategoryTableData({
  category,
  updateCategory,
  setCategoryData,
  onEdit,
  isSelectMode,
  onToggleSelect,
}: CategoryTableDataProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 5;
  const [inputPage, setInputPage] = useState<string>("");

  // State untuk menyimpan ID yang dipilih (saat isSelectMode = true)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // State sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof category | null;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  // Fungsi sorting
  const handleSort = (key: keyof category) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorting dengan useMemo
  const sortedData = useMemo(() => {
    const sortableData = [...category];
    if (sortConfig.key !== null) {
      const key = sortConfig.key;
      sortableData.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;
        if (key === "createdat") {
          aValue = new Date(a.createdat).getTime();
          bValue = new Date(b.createdat).getTime();
        } else {
          aValue = a[key] ? a[key].toString().toLowerCase() : "";
          bValue = b[key] ? b[key].toString().toLowerCase() : "";
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
  }, [category, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentPageData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    const currentPageIds = currentPageData.map((cat) => cat.id);
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

      setCategoryData((prev: category[]) => {
        // Hapus item yang dihapus dari data
        const newData = prev.filter((cat) => !selectedIds.has(cat.id));

        // Hitung ulang total halaman
        const newTotalPage = Math.ceil(newData.length / itemsPerPage);

        // Jika currentPage melebihi newTotalPage, atur currentPage ke newTotalPage
        if (currentPage > newTotalPage && newTotalPage > 0) {
          setCurrentPage(newTotalPage);
        }
        // Jika data kosong sama sekali, set currentPage ke 1 (opsional)
        if (newData.length === 0) {
          setCurrentPage(1);
        }

        return newData;
      });

      onToggleSelect(); // Menonaktifkan mode select
      updateCategory();
      setSelectedIds(new Set());

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
        setCategoryData((prev: category[]) => {
          const newData = prev.filter((cat) => cat.id !== id);
          const newTotalPage = Math.ceil(newData.length / itemsPerPage);
          if (currentPage > newTotalPage) {
            setCurrentPage(newTotalPage);
          }
          return newData;
        });
        updateCategory();
        await Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
    }
  };

  return (
    <>
      <div className="bg-slate-900/50 py-4 rounded-lg overflow-x-auto">
        <table className="min-w-full bg-slate-700 mt-3">
          <thead className="border-b border-gray-600">
            <tr className="text-white">
              {/* Satu kolom header untuk "No." dan checkbox check-all */}
              {isSelectMode && (
                <th className="py-3 px-2 text-left text-sm">
                  <input
                    type="checkbox"
                    checked={
                      currentPageData.length > 0 &&
                      currentPageData.every((cat) => selectedIds.has(cat.id))
                    }
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
              )}
              <th className="py-3 px-2 text-left text-sm w-16">No</th>
              <th
                className="py-3 px-2 text-left text-sm cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="py-3 px-2 text-left text-sm cursor-pointer"
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
                className="py-3 px-2 text-left text-sm cursor-pointer"
                onClick={() => handleSort("createdat")}
              >
                Created At{" "}
                {sortConfig.key === "createdat"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th className="py-3 px-2 text-left text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((cat: category, index: number) => (
              <tr key={cat.id} className="text-slate-200">
                {/* Kolom "No." + checkbox baris */}
                {isSelectMode && (
                  <td className="py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(cat.id)}
                      onChange={() => toggleSelectRow(cat.id)}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                <td className={"py-3 px-2 "}>
                  {(currentPage - 1) * itemsPerPage + index + 1}.
                </td>
                <td className="py-3 px-2">{cat.name}</td>
                <td className="py-3 px-2">
                  {cat.description || "No Description"}
                </td>
                <td className="py-3 px-2 hidden xl:table-cell">
                  {formatDate(cat.createdat.toString())}
                </td>
                <td className="py-3 px-2 xl:hidden">
                  {formatDateSM(cat.createdat.toString())}
                </td>
                <td className="py-3 px-2 flex gap-2">
                  <button
                    onClick={() => onEdit(cat)}
                    className="bg-green-500 hover:bg-green-600 py-2 px-3 rounded-lg text-white transition-transform transform hover:scale-105"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-500 hover:bg-red-600 py-2 px-3 rounded-lg text-white transition-transform transform hover:scale-105"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tombol Bulk Delete hanya muncul jika mode select aktif dan ada item yang dipilih */}
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 bg-slate-700 p-4 rounded-lg shadow-md">
        <div className="text-slate-200 text-sm mb-2 sm:mb-0">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
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
                        Math.max(1, parseInt(inputPage || String(currentPage))),
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
