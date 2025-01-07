import React from "react";
import { decryptPass, formatDate, formatDateSM } from "@/lib/utils";
import Link from "next/link";
import { deleteData } from "@/lib/account";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

interface AccountTableClientProps {
  accounts: any[];
  setAccountData: React.Dispatch<React.SetStateAction<any[]>>;
  updateAccount: () => void;
}

export default function AccountTableClient({
  accounts,
  setAccountData,
  updateAccount,
}: AccountTableClientProps) {
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
    <table className="bg-slate-700 mt-3 w-full">
      <thead className="border-b border-gray-600">
        <tr className="text-white *:py-3 *:px-2 *:text-left *:text-sm">
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
        {accounts.map((acc: any) => (
          <tr key={acc.id} className="*:text-slate-200 *:py-3 *:px-2">
            <td>{acc.title}</td>
            <td
              className="cursor-pointer"
              onClick={() => handleCopy(acc.account)}
            >
              {acc.account}
            </td>
            <td
              className="cursor-pointer"
              onClick={() => handleCopy(decryptPass(acc.password))}
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
  );
}
