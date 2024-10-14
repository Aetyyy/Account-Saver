import { getData } from "@/lib/account";
import { formatDate, decryptPass } from "@/lib/utils";

export default async function AccountTable() {
  const accounts = await getData();
  if (!accounts.data.length) {
    return (
      <table className="w-full">
        <thead className="border-b border-gray-100 overflow-hidden">
          <tr className="text-white">
            <th className="py-3 px-6 text-left text-sm">Name</th>
            <th className="py-3 px-6 text-left text-sm">Account</th>
            <th className="py-3 px-6 text-left text-sm">Password</th>
            <th className="py-3 px-6 text-left text-sm">Description</th>
            <th className="py-3 px-6 text-left text-sm">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="text-white text-lg font-semibold text-center py-4"
              colSpan={5}
            >
              No Account Found
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="bg-white mt-3 w-full">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Account</th>
          <th className="py-3 px-6 text-left text-sm">Password</th>
          <th className="py-3 px-6 text-left text-sm">Description</th>
          <th className="py-3 px-6 text-left text-sm">Category</th>
          <th className="py-3 px-6 text-left text-sm">Created At</th>
        </tr>
      </thead>
      <tbody>
        {accounts.data.map((acc: any) => (
          <tr key={acc.id}>
            <td className="py-3 px-6">{acc.title}</td>
            <td className="py-3 px-6">{acc.account}</td>
            <td className="py-3 px-6">{decryptPass(acc.password)}</td>
            <td className="py-3 px-6">{acc.description}</td>
            <td className="py-3 px-6">{acc.category}</td>
            <td className="py-3 px-6">
              {formatDate(acc.createdat.toString())}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
