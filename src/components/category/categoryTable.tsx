import Loading from "@/components/loading"; // Asumsi Anda punya komponen Loading
import { category } from "@prisma/client";
import CategoryTableData from "./categoryTableData";

interface CategoryTableProps {
  dataCategory: category[];
  setCategory: React.Dispatch<React.SetStateAction<category[]>>;
  loading: boolean;
  updateCategory: () => void;
  onToggleSelect: () => void; // Toggle mode select
  isSelectMode: boolean; // Terima prop isSelectMode dari parent
  onEdit: (category: category) => void;
}

export default function CategoryTable({
  dataCategory,
  setCategory,
  loading,
  updateCategory,
  onToggleSelect,
  isSelectMode,
  onEdit,
}: CategoryTableProps) {
  return loading ? (
    <Loading />
  ) : dataCategory.length > 0 ? (
    <CategoryTableData
      category={dataCategory}
      updateCategory={updateCategory}
      setCategoryData={setCategory}
      onEdit={onEdit}
      onToggleSelect={onToggleSelect}
      isSelectMode={isSelectMode}
    />
  ) : (
    <div className="bg-slate-900/50 py-4 rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-100">
          <tr className="text-white">
            <th className="py-3 px-6 text-left text-sm">No.</th>
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
    </div>
  );
}
