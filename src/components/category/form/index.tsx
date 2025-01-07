import Link from "next/link";
import React from "react";

interface modalProps {
  onOpen: () => void;
}

export default function AddCategory({ onOpen }: modalProps) {
  return (
    <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex flex-wrap justify-between items-center gap-4 overflow-hidden">
      <div className="text-white text-2xl font-bold">Account Category</div>
      <div className="flex flex-row justify-end items-center gap-2">
        <Link
          href={"/storage"}
          className="bg-slate-700/50 hover:bg-slate-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
        >
          <span className="text-white font-semibold">Back</span>
        </Link>
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
