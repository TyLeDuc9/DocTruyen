import { useAllStory } from "../../hooks/useAllStory";
import { useAllCategory } from "../../hooks/useAllCategory";
import { FilterStory } from "../../components/Filter/FilterStory";
import { useState } from "react";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { useNavigate } from "react-router-dom";
import { useSoftDeleteStory } from "../../hooks/useSoftDeleteStory";
import { useRestoreStory } from "../../hooks/useRestoreStory";

export const TableStory = () => {
  const {
    allStory,
    loading,
    error,
    totalStory,
    filters,
    updateFilter,
    handleSearch,
    handleReset,
    searchText,
    setSearchText,
  } = useAllStory();
  const navigate = useNavigate();
  const { softDeleteStory, error: softError } = useSoftDeleteStory(() => {
    updateFilter({ ...filters });
  });
  const { restoreStory, error: resStoreError } = useRestoreStory(() => {
    updateFilter({ ...filters });
  });
  const { allCategory } = useAllCategory();
  const [previewImages, setPreviewImages] = useState<string | null>(null);
  const thClass = "p-3 border border-white/10";
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);
  const statusClass: Record<string, string> = {
    UPCOMING: "bg-blue-100 text-blue-600",
    ONGOING: "bg-green-100 text-green-600",
    COMPLETED: "bg-purple-100 text-purple-600",
    DROPPED: "bg-red-100 text-red-600",
  };
  const tdClass = "p-3 border border-gray-200 text-sm";
  const actionBtn = "px-4 py-2 text-xs font-medium rounded transition-colors";
  if (loading) return <div>Đang tải...</div>;
  if (error || softError || resStoreError)
    return <div>{error || softError || resStoreError}</div>;
  return (
    <div className="space-y-4 p-4">
      <FilterStory
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
        handleSearch={handleSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        categories={allCategory}
      />
      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Story List</h3>
            <p className="text-sm text-gray-500">
              Total stories: <span className="font-semibold">{totalStory}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
            <button
              onClick={() => navigate("/admin/story/create")}
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
                  <th className={thClass}>AlterName</th>
                  <th className={thClass}>Image</th>
                  <th className={thClass}>Author</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Views</th>
                  <th className={thClass}>Country</th>
                  <th className={thClass}>TotalChapters</th>
                  <th className={thClass}>Description</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>
                  <th className={thClass}>Status Soft Delete</th>
                  <th className={thClass}>Edit</th>
                  <th className={thClass}>Soft Delete/Restore</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allStory.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {c.name}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {c.alternateName}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <img
                        className="cursor-pointer"
                        onClick={() => setPreviewImages(c.thumbnail)}
                        src={c.thumbnail}
                        alt={c.name}
                      />
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {c.author}
                    </td>
                    <td className="p-3 border border-gray-200 lowercase">
                      <span
                        className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold ${
                          statusClass[c.status]
                        }`}
                      >
                        <p></p>
                        {c.status}
                      </span>
                    </td>
                    <td className={tdClass}>{c.views}</td>
                    <td className={tdClass}>{c.country}</td>
                    <td className={tdClass}>{c.totalChapters}</td>
                    <td className="p-3 border border-gray-200 text-gray-700 relative">
                      <div className="group line-clamp-2 cursor-help">
                        {c.description}
                        <div
                          className="absolute left-1/2 top-full z-50 hidden w-[500px] 
                        -translate-x-1/2 rounded-lg bg-black p-3 text-sm text-white group-hover:block"
                        >
                          {c.description}
                        </div>
                      </div>
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
                    <td className="p-3 border border-gray-200">
                      <span
                        className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold
                          ${c.isDeleted ? "text-green-700 bg-green-100" : "text-orange-700 bg-orange-100"}
                        `}
                      >
                        {c.isDeleted ? "true" : "false"}
                      </span>
                    </td>
                    <td
                      onClick={() =>
                        navigate(`/admin/story/update/${c.slug}`)
                      }
                      className={tdClass}
                    >
                      <button
                        className={`${actionBtn} bg-blue-500 hover:bg-blue-600 cursor-pointer text-white`}
                      >
                        Edit
                      </button>
                    </td>
                    <td className={`${tdClass} border-b border-black`}>
                      <div className="flex gap-2 justify-center">
                        <button
                          disabled={c.isDeleted}
                          onClick={() => softDeleteStory(c._id)}
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
                          onClick={() => restoreStory(c._id)}
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

          {allStory.length === 0 && (
            <div className="p-6 text-center text-gray-500">Not found</div>
          )}
        </div>
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalStory}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
        {previewImages && (
          <div
            onClick={() => setPreviewImages(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <img
              onClick={(e) => e.stopPropagation()}
              src={previewImages}
              alt="preview"
              className="max-w-[95%] max-h-[95%] rounded-xl shadow-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};
