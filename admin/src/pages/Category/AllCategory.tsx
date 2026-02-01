import { useNavigate } from "react-router-dom";
import { FilterCategory } from "../../components/Filter/FilterCategory";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { useAllCategory } from "../../hooks/useAllCategory";
import { useForceDeleteCategory } from "../../hooks/useForceDeleteCategory";
import { useSoftDeleteCategory } from "../../hooks/useSoftDeleteCategory";
import { useRestoreCategory } from "../../hooks/useRestoreCategory";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const AllCategory = () => {
  const navigate = useNavigate();
  const {
    allCategory,
    loading,
    error,
    totalCategories,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    searchText,
    setSearchText,
  } = useAllCategory();
  const { forceDeleteCategory, error: forceError } = useForceDeleteCategory(
    () => {
      updateFilter({ ...filters });
    },
  );
  const { softDeleteCategory, error: softError } = useSoftDeleteCategory(() => {
    updateFilter({ ...filters });
  });
  const { restoreCategory } = useRestoreCategory(() => {
    updateFilter({ ...filters });
  });
  const tdClass = "p-3 border border-gray-200 text-sm";
  const thClass = "p-3 border border-white/10";
  const actionBtn = "px-4 py-2 text-xs font-medium rounded transition-colors";
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);

  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error || forceError || softError) {
    return <div>{error || forceError || softError}</div>;
  }
  return (
    <div className="space-y-4 p-4">
      <FilterCategory
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
        handleSearch={handleSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Category List
            </h3>
            <p className="text-sm text-gray-500">
              Total categories:{" "}
              <span className="font-semibold">{totalCategories}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
            <button
              onClick={() => navigate("/admin/category/create")}
              className="bg-yellow-400 px-3 py-1 text-base rounded-sm cursor-pointer hover:bg-amber-400/60 font-medium text-white"
            >
              Create
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-main text-white">
                <tr className="text-center text-sm">
                  <th className={thClass}>STT</th>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Content</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>
                  <th className={thClass}>Edit</th>
                  <th className={thClass}>Delete</th>
                  <th className={thClass}>Soft Delete/Restore</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allCategory.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className={tdClass}>{startIndex + index + 1}</td>
                    <td
                      className={`p-3 border border-gray-200 font-medium text-main 
                        ${c.isDeleted ? "line-through text-gray-400" : ""}`}
                    >
                      {c.name}
                    </td>
                    <td
                      className={`${tdClass} ${c.isDeleted ? "line-through text-gray-400" : ""}`}
                    >
                      {c.content}
                    </td>
                    <td className={tdClass}>
                      {c.updatedAt
                        ? new Date(c.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className={tdClass}>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td
                      onClick={() =>
                        navigate(`/admin/category/update/${c.slug}`)
                      }
                      className={tdClass}
                    >
                      <button
                        className={`${actionBtn} bg-blue-500 hover:bg-blue-600 cursor-pointer text-white`}
                      >
                        Edit
                      </button>
                    </td>

                    <td className={tdClass}>
                      <button
                        onClick={() => forceDeleteCategory(c._id)}
                        className={`${actionBtn} bg-red-500 hover:bg-red-600 cursor-pointer text-white`}
                      >
                        Delete
                      </button>
                    </td>

                    <td className={`${tdClass} border-b border-black`}>
                      <div className="flex gap-2 justify-center">
                        <button
                          disabled={c.isDeleted}
                          onClick={() => softDeleteCategory(c._id)}
                          className={`${actionBtn} ${
                            c.isDeleted
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                          }`}
                        >
                          Soft Delete
                        </button>
                        <button
                          disabled={!c.isDeleted}
                          onClick={() => restoreCategory(c._id)}
                          className={`${actionBtn} ${
                            !c.isDeleted
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                          }`}
                        >
                          Restore
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allCategory.length === 0 && (
            <div className="p-6 text-center text-gray-500">Not found</div>
          )}
        </div>
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalCategories}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
    </div>
  );
};
