"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/data";
import { formatDate, formatDateSM } from "@/lib/utils";
import Loading from "@/components/loading";
import { user } from "@prisma/client";

const ITEMS_PER_PAGE = 5;

export default function UserTable() {
  const [users, setUsers] = useState<user[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  {
    /* Retrieve user data when the component is mounted */
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = (await getUsers()) || [];
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  {
    /* Total page count */
  }
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  {
    /* User data for the current page */
  }
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (users.length < 1) {
    return <>{loading ? <Loading /> : <h1>No User Found</h1>}</>;
  } else {
    return (
      <>
        <table className="bg-slate-600 mt-3 table-auto overflow-hidden w-full">
          <thead className="text-white">
            <tr>
              <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">
                Name
              </th>
              <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">
                Email
              </th>
              <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">
                Role
              </th>
              <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">
                Verified?
              </th>
              <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-100">
            {paginatedUsers.map((user: user) => (
              <tr key={user.id} className="even:bg-gray-500">
                <td className="py-3 px-6 border-2 border-slate-700">
                  {user.name}
                </td>
                <td className="py-3 px-6 border-2 border-slate-700">
                  {user.email}
                </td>
                <td className="py-3 px-6 border-2 border-slate-700">
                  {user.role}
                </td>
                <td className="py-3 px-6 border-2 border-slate-700">
                  {user.verifiedUser ? "Verified" : "Not Verified"}
                </td>
                <td className="py-3 px-6 border-2 border-slate-700 hidden lg:table-cell">
                  {formatDate(user.createdAt.toString())}
                </td>
                <td className="py-3 px-6 border-2 border-slate-700 lg:hidden">
                  {formatDateSM(user.createdAt.toString())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Number Buttons */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                disabled={totalPages === 1}
                className={`px-4 py-2 rounded disabled:bg-slate-700 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700 text-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
