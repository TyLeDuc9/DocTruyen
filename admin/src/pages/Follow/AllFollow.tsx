import { useAllFollow } from "../../hooks/useAllFollow";
import { FilterFavorite } from "../../components/Filter/FilterFavorite";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { useForceDeleteFollow } from "../../hooks/useForceDeleteFollow";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const AllFollow = () => {
  const {
    allFollow,
    loading,
    error,
    totalFollow,
    filters,
    updateFilter,
    handleReset,
  } = useAllFollow();
  const { forceDeleteCategory, error: errorForce } = useForceDeleteFollow(
    () => {
      updateFilter({ ...filters });
    },
  );
  const thClass = "p-3 border border-white/10";
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);
  const actionBtn =
    "px-4 py-2 text-xs font-medium rounded cursor-pointer transition-colors";
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error || errorForce) return <div>Lỗi tải thể loại</div>;
  return (
    <div className="space-y-4 p-4">
      <FilterFavorite
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
      />

      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Follow List</h3>
            <p className="text-sm text-gray-500">
              Total follows:{" "}
              <span className="font-semibold">{totalFollow}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-main text-white">
                <tr className="text-center text-sm">
                  <th className={thClass}>STT</th>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Image</th>
                  <th className={thClass}>Email</th>
                  <th className={thClass}>UserName</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>
                  <th className={thClass}>Delete</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allFollow.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {c.storyId.name}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <img
                        className="w-14 h-20"
                        src={c.storyId.thumbnail}
                        alt={c.storyId.name}
                      />
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {c.userId?.email || "Not found"}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {c.userId?.userName || "Not found"}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {c.updatedAt
                        ? new Date(c.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-3 border border-gray-200 text-gray-700">
                      <button
                        onClick={() => forceDeleteCategory(c._id)}
                        className={`${actionBtn} bg-red-500 hover:bg-red-600 text-white`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allFollow.length === 0 && (
            <div className="p-6 text-center text-gray-500">Not found</div>
          )}
        </div>
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalFollow}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
    </div>
  );
};
