import React from "react";
import CategoryModal from "@/components/category/data";

export default function IndexCategory() {
  return (
    <div className="px-4 min-h-screen">
      <div className="max-w-screen-2xl mx-auto mt-[50px] flex flex-col gap-6">
        <div className=" flex flex-col gap-6">
          <CategoryModal />
        </div>
      </div>
    </div>
  );
}
