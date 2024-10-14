import { getUsers } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function UserTable() {
  const users = await getUsers();
  if (!users?.length) return <h1>No User Found</h1>;

  return (
    <table className="bg-slate-600 mt-3 table-auto overflow-hidden">
      <thead className="text-white">
        <tr>
          <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">Name</th>
          <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">Email</th>
          <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">Role</th>
          <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">Verified?</th>
          <th className="border-2 border-slate-700 py-3 px-6 text-left text-sm">Created At</th>
        </tr>
      </thead>
      <tbody className="text-slate-100">
        {users.map((user) => (
          <tr key={user.id} className="even:bg-gray-500">
            <td className="py-3 px-6 border-2 border-slate-700">{user.name}</td>
            <td className="py-3 px-6 border-2 border-slate-700">{user.email}</td>
            <td className="py-3 px-6 border-2 border-slate-700">{user.role}</td>
            <td className="py-3 px-6 border-2 border-slate-700">
              {user.verifiedUser ? "Verified" : "Not Verified"}
            </td>
            <td className="py-3 px-6 border-2 border-slate-700">
              {formatDate(user.createdAt.toString())}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
