import { useNavigate } from "react-router-dom";
import { FilterChapter } from "../../components/Filter/FilterChapter";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { useAllChapter } from "../../hooks/useAllChapter";
import { useRestoreChapter } from "../../hooks/useRestoreChapter";
import { useSoftDeleteChapter } from "../../hooks/useSoftDeleteChapter";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useForceDeleteChapter } from "../../hooks/useForceDeleteChapter";
export const AllChapter = () => {
  const navigate = useNavigate();
  const {
    allChapter,
    loading,
    error,
    totalChapter,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    setSearchText,
    searchText,
  } = useAllChapter();
  const { restoreChapter, error: restoreError } = useRestoreChapter(() => {
    updateFilter({ ...filters });
  });
  const { softDeleteChapter, error: softError } = useSoftDeleteChapter(() => {
    updateFilter({ ...filters });
  });
  const { forceDeleteChapter, error: deleteError } = useForceDeleteChapter(
    () => {
      updateFilter({ ...filters });
    },
  );

  const thClass = "p-3 border border-white/10";
  const tdClass = "p-3 border border-gray-200 text-gray-700";
  const actionBtn = "px-4 py-2 text-xs font-medium rounded transition-colors";
  const [previewImages, setPreviewImages] = useState<string[] | null>(null);
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error || restoreError || softError || deleteError)
    return <div>{error || restoreError || softError || deleteError}</div>;
  return (
    <div className="space-y-4 p-4">
      <FilterChapter
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
              Chapter List
            </h3>
            <p className="text-sm text-gray-500">
              Total chaptes:
              <span className="font-semibold">{totalChapter}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
            <button
              onClick={() => navigate("/admin/chapter/create")}
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
                  <th className={thClass}>Images</th>
                  <th className={thClass}>Content</th>
                  <th className={thClass}>Type</th>
                  <th className={thClass}>Views</th>
                  <th className={thClass}>chapterMain</th>
                  <th className={thClass}>chapterSub</th>
                  <th className={thClass}>displayNumber</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>
                  <th className={thClass}>Soft Delete/Restore</th>
                  <th className={thClass}>Delete</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allChapter.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {c.title}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {c.images.length > 0 ? (
                        <div
                          className="relative w-16 h-16 mx-auto cursor-pointer"
                          onClick={() => setPreviewImages(c.images)}
                        >
                          <img
                            src={c.images[0]}
                            alt={c.title}
                            className="w-full h-full rounded object-cover border border-gray-200"
                            loading="lazy"
                          />

                          {c.images.length > 1 && (
                            <span className="absolute -top-1 -right-1 bg-main text-white text-[10px] px-1.5 py-0.5 rounded-full">
                              +{c.images.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </td>

                    <td className={tdClass}>{c.content}</td>
                    <td className={tdClass}>{c.type}</td>
                    <td className={tdClass}>{c.views}</td>
                    <td className={tdClass}>{c.chapterMain}</td>
                    <td className={tdClass}>{c.chapterSub}</td>
                    <td className={tdClass}>{c.displayNumber}</td>
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
                    <td className={`${tdClass} border-b border-black`}>
                      <div className="flex gap-2 justify-center">
                        <button
                          disabled={c.isDeleted}
                          onClick={() => softDeleteChapter(c._id)}
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
                          onClick={() => restoreChapter(c._id)}
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
                    <td className={tdClass}>
                      <button
                        onClick={() => forceDeleteChapter(c._id)}
                        className={`${actionBtn} bg-red-500 hover:bg-red-600 cursor-pointer text-white`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalChapter}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
      {previewImages && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewImages(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImages(null)}
              className="absolute top-2 text-2xl cursor-pointer right-2 text-gray-500 hover:text-black"
            >
              <FiX />
            </button>

            <div className="space-y-3">
              {previewImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`chapter-${i}`}
                  className="w-full"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
