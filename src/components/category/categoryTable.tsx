import Loading from "@/components/loading";
import { category } from "@prisma/client";
import CategoryTableData from "./categoryTableData";

interface CategoryTableProps {
  dataCategory: category[];
  setCategory: React.Dispatch<React.SetStateAction<category[]>>;
  loading: boolean;
  updateCategory: () => void;
}

export default function CategoryTable({
  dataCategory,
  loading,
  updateCategory,
  setCategory,
}: CategoryTableProps) {
  return loading ? (
    <Loading />
  ) : dataCategory.length > 0 ? (
    <CategoryTableData
      category={dataCategory}
      updateCategory={updateCategory}
      setCategoryData={setCategory}
    />
  ) : (
    <table className="w-full">
      <thead className="border-b border-gray-100">
        <tr className="text-white">
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Description</th>
          <th className="py-3 px-6 text-left text-sm">Created At</th>
          <th className="py-3 px-6 text-left text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            className="text-white text-lg font-semibold text-center py-4"
            colSpan={4}
          >
            No Category Found
          </td>
        </tr>
      </tbody>
    </table>
  );
}
