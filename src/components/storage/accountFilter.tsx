"use client";

import { useEffect, useState } from "react";
import AccountTable from "@/components/storage/accountTable";
import Select, { MultiValue } from "react-select";
import { OptionType } from "@/types/option.i";
import { category } from "@prisma/client";
import { getData } from "@/lib/category";

export default function AccountFilter() {
  const [category, setCategory] = useState<MultiValue<OptionType>>([]);
  const [isClient, setIsClient] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await getData();
        const mappedOptions = category.data
          ? category.data.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          : [];

        const additionalOption = { value: "No Category", label: "No Category" };
        setOptions([additionalOption, ...mappedOptions]);
      } catch (e) {
        console.error(e);

        setOptions([{ value: "No Category", label: "No Category" }]);
      }
    };

    setIsClient(true);
    getCategory();
  }, []);

  const handleFilterCategory = (selected: MultiValue<OptionType>) => {
    setCategory(selected);
  };

  return (
    <>
      <div className="bg-slate-900/50 px-8 py-4 rounded-lg flex items-center">
        <div className="w-full md:w-1/4 sm:1/6">
          {isClient && (
            <Select
              isMulti={true}
              options={options}
              onChange={handleFilterCategory}
            />
          )}
        </div>
      </div>

      <div className="bg-slate-900/50 py-2 rounded-lg overflow-auto">
        <AccountTable category={category} />
      </div>
    </>
  );
}
