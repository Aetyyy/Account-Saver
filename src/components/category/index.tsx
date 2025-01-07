import React from "react";
import CategoryModal from "@/components/category/data";

export default function IndexCategory() {
  return (
    <div className="mt-[100px] px-4 min-h-screen">
      <div className="max-w-screen-2xl mx-auto py-10 flex flex-col gap-6">
        <CategoryModal />
      </div>
    </div>
  );
}
