// components/category/form/index.tsx
import Link from "next/link";
import React from "react";

interface AddCategoryProps {
  onOpen: () => void; // Buka modal Add Data
  onToggleSelect: () => void; // Toggle mode select
  isSelectMode: boolean; // Apakah mode select aktif
  hasData: boolean; // True jika ada data kategori, false jika tidak ada data
}

export default function AddCategory({
  onOpen,
  onToggleSelect,
  isSelectMode,
  hasData,
}: AddCategoryProps) {
  return (
    <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex flex-wrap justify-between items-center gap-4 overflow-hidden">
      <div className="text-white text-2xl font-bold">Account Category</div>
      <div className="flex flex-row justify-end items-center gap-2">
        {/* Tombol Back */}
        <Link
          href={"/storage"}
          className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
        >
          <span className="text-white font-semibold">Back</span>
        </Link>
        {/* Tombol Select hanya muncul jika ada data */}
        {hasData && (
          <button
            onClick={onToggleSelect}
            className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
          >
            <span className="text-white font-semibold">
              {isSelectMode ? "Cancel" : "Select"}
            </span>
          </button>
        )}
        {/* Tombol Add Data */}
        <button
          onClick={onOpen}
          className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
        >
          <span className="text-white font-semibold">Add Data</span>
        </button>
      </div>
    </div>
  );
}
