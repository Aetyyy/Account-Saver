"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { getDataById, updateData } from "@/lib/account";
import { getData } from "@/lib/category";
import { useFormState } from "react-dom";
import { decryptPass } from "@/lib/utils";

export default function Form({ AccountId }: { AccountId: string }) {
  const [state, formAction] = useFormState(updateData, null);
  const [accountData, setAccountData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch account data by ID
    const fetchAccountData = async () => {
      const result = await getDataById(AccountId);
      if (result?.data) {
        const data = result.data;
        setAccountData(data);
        setTitle(data.title);
        setAccount(data.account);
        setPassword(data.password);
        setCategoryId(data.categoryid || ""); // If no category, set empty string
        setDescription(data.description);
      }
    };

    // Fetch all categories
    const fetchCategories = async () => {
      const result = await getData();
      if (result?.data) {
        setCategories(result.data);
      }
    };

    fetchAccountData();
    fetchCategories();
  }, [AccountId]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value === "" ? null : e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form id="updateForm" action={formAction} className="grid gap-4 w-full">
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          {state?.error?.title && (
            <span className="text-sm text-red-500 mt-2">
              {state.error.title.join(", ")}
            </span>
          )}
        </div>
        <input type="hidden" name="id" value={AccountId} />
        <div className="flex flex-col">
          <label htmlFor="account" className="text-white">
            Account
          </label>
          <input
            type="text"
            name="account"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          {state?.error?.account && (
            <span className="text-sm text-red-500 mt-2">
              {state.error.account.join(", ")}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={decryptPass(password)}
            onChange={handlePasswordChange}
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          {state?.error?.password && (
            <span className="text-sm text-red-500 mt-2">
              {state.error.password.join(", ")}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-white">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={categoryId || ""}
            onChange={handleCategoryChange}
            className="w-full p-2 rounded-md bg-gray-50 text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            {/* No Category option */}
            <option value="">No Category</option>

            {/* Map other categories */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={description || "No Description"}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md px-2 py-2 focus:outline-none"
        />
        {state?.error?.description && (
          <span className="text-sm text-red-500 mt-2">
            {state.error.description.join(", ")}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-slate-700/50 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
      >
        Save
      </button>
    </form>
  );
}
