import React, { useState } from "react";
import { decryptPass, formatDate, formatDateSM } from "@/lib/utils";
import Link from "next/link";
import { deleteData } from "@/lib/account";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Account, AccountData } from "@/types/storage.i";

type SetAccountDataType = React.Dispatch<React.SetStateAction<AccountData[]>>;

interface AccountTableClientProps {
  accounts: Account[];
  setAccountData: SetAccountDataType;
  updateAccount: () => void;
}

export default function AccountTableClient({
  accounts,
  setAccountData,
  updateAccount,
}: AccountTableClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [inputPage, setInputPage] = useState("");
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowEscapeKey: false,
        allowOutsideClick: false,
        keydownListenerCapture: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteData({ id });
          await setAccountData((prev) => prev.filter((acc) => acc.id !== id));
          await updateAccount();

          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(text);
        // Display notifications using SweetAlert2
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Copied!",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        // Fallback for devices that do not support navigator.clipboard
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoids scrolling to this element
        textArea.style.opacity = "0"; // Make elements invisible
        textArea.style.pointerEvents = "none"; // Not interactable
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy"); // Fallback for older devices

        Swal.fire({
          toast: true,
          icon: "success",
          title: "Copied!",
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Failed to copy text: ", error);
      // Display an error notification
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Failed to copy!",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <div className="bg-slate-900/50 py-2 rounded-lg overflow-auto">
        <table className="bg-slate-700 mt-3 w-full">
          <thead className="border-b border-gray-600">
            <tr className="text-white *:py-3 *:px-2 *:text-left *:text-sm">
              <th>No.</th>
              <th>Name</th>
              <th>Account</th>
              <th>Password</th>
              <th>Description</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((acc: Account, index: number) => (
                <tr key={acc.id} className="*:text-slate-200 *:py-3 *:px-2">
                  <td className="py-3 px-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>{acc.title}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleCopy(acc.account)}
                  >
                    {acc.account}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={async () =>
                      handleCopy(await decryptPass(acc.password))
                    }
                  >
                    {decryptPass(acc.password)}
                  </td>
                  <td>{acc.description || "No Description"}</td>
                  <td>{acc.category?.name || "No Category"}</td>
                  <td className="hidden xl:table-cell">
                    {formatDate(acc.createdat.toISOString())}
                  </td>
                  <td className="xl:hidden">
                    {formatDateSM(acc.createdat.toISOString())}
                  </td>
                  <td className="flex gap-2">
                    <Link
                      href={`/storage/edit/${acc.id}`}
                      className="bg-green-500 hover:bg-green-600 py-4 md:py-3 px-4 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="bg-red-500 hover:bg-red-600 py-4 md:py-3 px-4 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 bg-slate-700 p-4 rounded-lg overflow-auto shadow-md">
        <div className="text-slate-200 text-sm">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, accounts.length)} of{" "}
          {accounts.length} entries
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
                  value={inputPage}
                  min={1}
                  max={totalPages}
                  onChange={(e) => setInputPage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const page = Math.min(
                        Math.max(1, parseInt(inputPage)),
                        totalPages
                      );
                      setCurrentPage(page);
                      setInputPage("");
                    }
                  }}
                  className="w-12 md:w-16 px-2 py-1 text-center bg-slate-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none 
           [&::-webkit-outer-spin-button]:appearance-none 
           [-moz-appearance:textfield]"
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
