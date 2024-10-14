import React, { useEffect } from "react";

interface DatasemenProps {
  type?: string;
  total?: number;
  memek?: string | string[] | undefined;
}

const Datasemen: React.FC<DatasemenProps> = ({ type, total, memek }) => {
  return (
    <div className="rounded-2xl odd:bg-black even:bg-[#050A30] p-4 flex-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-medium bg-white px-2 py-1 rounded-full text-green-600">
          10/12/2024
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4">{total || memek}</h1>
      <h2>{type}</h2>
    </div>
  );
};

const User: React.FC<DatasemenProps> = ({ type, memek }) => {
  "use client";

  return (
    <div className="rounded-2xl odd:bg-black even:bg-[#050A30] p-4 flex-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-medium bg-white px-2 py-1 rounded-full text-green-600">
          10/12/2024
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4">{memek}</h1>
      <h2>{type}</h2>
    </div>
  );
};

export { Datasemen, User };
