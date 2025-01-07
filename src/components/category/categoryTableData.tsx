import { deleteData } from "@/lib/category";
import { formatDate, formatDateSM } from "@/lib/utils";
import { category } from "@prisma/client";
import React from "react";
import Swal from "sweetalert2";

interface CategoryTableDataProps {
  category: category[];
  updateCategory: () => void;
  setCategoryData: React.Dispatch<React.SetStateAction<category[]>>;
}

export default function CategoryTableData({
  category,
  updateCategory,
  setCategoryData,
}: CategoryTableDataProps) {
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
          await setCategoryData((prev: category[]) =>
            prev.filter((cat) => cat.id !== id)
          );
          await updateCategory();

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

  return (
    <table className="bg-slate-700 mt-3 w-full">
      <thead className="border-b border-gray-600">
        <tr className="text-white">
          <th className="py-3 px-2 text-left text-sm">Name</th>
          <th className="py-3 px-2 text-left text-sm">Description</th>
          <th className="py-3 px-2 text-left text-sm">Created At</th>
          <th className="py-3 px-2 text-left text-sm">Action</th>
        </tr>
      </thead>
      <tbody>
        {category.map((cat: category) => (
          <tr key={cat.id} className="text-slate-200">
            <td className="py-3 px-2">{cat.name}</td>
            <td className="py-3 px-2">{cat.description}</td>
            <td className="py-3 px-2 hidden xl:table-cell">
              {formatDate(cat.createdat.toString())}
            </td>
            <td className="py-3 px-2 xl:hidden">
              {formatDateSM(cat.createdat.toString())}
            </td>
            <td className="py-3 px-2 flex gap-2">
              <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105">
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg text-white transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
