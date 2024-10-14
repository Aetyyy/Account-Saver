import { getData } from "@/lib/category";
import { formatDate, decryptPass } from "@/lib/utils";

export default async function CategoryTable() {
  const categories = await getData();
  if (!categories.status) {
    return (
      <table className="w-full">
        <thead className="border-b border-gray-100 overflow-hidden">
          <tr className="text-white">
            <th className="py-3 px-6 text-left text-sm">Name</th>
            <th className="py-3 px-6 text-left text-sm">Description</th>
            <th className="py-3 px-6 text-left text-sm">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="text-white text-lg font-semibold text-center py-4"
              colSpan={3}
            >
              No Category Found
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
          <th className="py-3 px-6 text-left text-sm">Description</th>
          <th className="py-3 px-6 text-left text-sm">Created At</th>
        </tr>
      </thead>
      <tbody>
        {categories.data.map((cat: any) => (
          <tr key={cat.id}>
            <td className="py-3 px-6">{cat.name}</td>
            <td className="py-3 px-6">{cat.description}</td>
            <td className="py-3 px-6">
              {formatDate(cat.createdat.toString())}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
