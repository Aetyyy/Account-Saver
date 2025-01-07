"use client";
import { insertData } from "@/lib/account";
import { useFormState } from "react-dom";

export default function Form() {
  const [state, formAction] = useFormState(insertData, null);

  return (
    <form id="addForm" action={formAction} className="grid gap-4 w-full">
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
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
            className="w-full rounded-md px-2 py-2 focus:outline-none bg-slate-800 text-white"
          />
          {state?.error?.title && (
            <span className="text-sm text-red-500 mt-2">
              {state.error.title.join(", ")}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="account" className="text-white">
            Account
          </label>
          <input
            type="text"
            name="account"
            id="account"
            className="w-full rounded-md px-2 py-2 focus:outline-none bg-slate-800 text-white"
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
            type="password"
            name="password"
            id="password"
            className="w-full rounded-md px-2 py-2 focus:outline-none bg-slate-800 text-white"
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
            className="w-full p-2 rounded-md bg-slate-800 text-white border border-slate-950 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Choose a Category</option>
            <option value="cm355196b00006i3xezkhhqro">Games</option>
            <option value="Sosmed">Social Media</option>
            <option value="Private">Private</option>
            <option value="Website">Website</option>
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
          className="w-full min-h-24 rounded-md px-2 py-2 focus:outline-none bg-slate-800 text-white max-h-40"
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
