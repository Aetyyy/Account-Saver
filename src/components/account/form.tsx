"use client";
import { insertData } from "@/lib/account";
import { useFormState } from "react-dom";

export default function Form({ session }: any) {
  const [state, formAction] = useFormState(insertData, null);

  return (
    <form
      id="addForm"
      action={formAction}
      className="flex flex-col w-full gap-4"
    >
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}
      <div className="flex flex-row gap-8">
        <div className="basis-1/2 flex flex-col gap-2">
          <label htmlFor="" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="title"
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error && (
                <div
                  className="mb-4 text-sm text-red-500 rounded-lg"
                  role="alert"
                >
                  {state?.error.title && (
                    <div>
                      {state?.error.title.map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="basis-1/2 flex flex-col gap-2">
          <label htmlFor="" className="text-white">
            Account
          </label>
          <input
            type="text"
            name="account"
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error && (
                <div
                  className="mb-4 text-sm text-red-500 rounded-lg"
                  role="alert"
                >
                  {state?.error.account && (
                    <div>
                      {state?.error.account.map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="basis-1/2 flex flex-col gap-2">
          <label htmlFor="" className="text-white">
            Password
          </label>
          <input
            type="text"
            name="password"
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error && (
                <div
                  className="mb-4 text-sm text-red-500 rounded-lg"
                  role="alert"
                >
                  {state?.error.password && (
                    <div>
                      {state?.error.password.map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="basis-1/2 flex flex-col gap-2">
          <label htmlFor="" className="text-white">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-md px-2 py-2 focus:outline-none"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error && (
                <div
                  className="mb-4 text-sm text-red-500 rounded-lg"
                  role="alert"
                >
                  {state?.error.description && (
                    <div>
                      {state?.error.description.map((msg, idx) => (
                        <p key={idx}>{msg}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
      <button
        className="bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-lg"
        type="submit"
      >
        <span className="text-white font-semibold">Save</span>
      </button>
    </form>
  );
}
