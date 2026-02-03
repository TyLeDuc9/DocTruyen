import { useNavigate } from "react-router-dom";
import { FilterNotify } from "../../components/Filter/FilterNotify";
import { useAllNotify } from "../../hooks/useAllNotify";
import { useEffect } from "react";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useDeleteNotify } from "../../hooks/useDeleteNotify";
export const Notify = () => {
  const navigate = useNavigate();
  const {
    allNotify,
    loading,
    error,
    totalNotify,
    filters,
    updateFilter,
    handleReset,
  } = useAllNotify();
  const { deleteNotify, error: notifyError } = useDeleteNotify(() => {
    updateFilter({ ...filters });
  });
  const actionBtn =
    "px-4 py-2 text-xs font-medium rounded cursor-pointer transition-colors";
  const thClass = "p-3 border border-white/10";
  const tdClass = "p-3 border border-gray-200 text-sm";
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error || notifyError) return <div>{error || notifyError}</div>;
  return (
    <div className="space-y-4 p-4">
      <FilterNotify
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
      />
      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Notify List</h3>
            <p className="text-sm text-gray-500">
              Total notify: <span className="font-semibold"></span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page
            </span>
            <button
              onClick={() => navigate("/admin/notify/create")}
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
                  <th className={thClass}>Email</th>
                  <th className={thClass}>Title</th>
                  <th className={thClass}>Message</th>
                  <th className={thClass}>Link</th>
                  <th className={thClass}>Story</th>
                  <th className={thClass}>Chapter</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>
                  <th className={thClass}>Delete</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {allNotify.map((u, index) => (
                  <tr
                    key={u._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className={tdClass}>{startIndex + index + 1}</td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {u.userId.email}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {u.title}
                    </td>
                    <td className={tdClass}>{u.message}</td>
                    <td className={tdClass}>
                      <a
                        href={u.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {u.link}
                      </a>
                    </td>
                    <td className="p-3 border border-gray-200">
                      {u.storyId && (
                        <img
                          className="w-12 h-16 mx-auto cursor-pointer object-cover"
                          src={u.storyId.thumbnail}
                          alt={u.storyId.name}
                        />
                      )}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {u.chapterId && u.chapterId.images?.length > 0 && (
                        <img
                          className="w-12 h-16 mx-auto cursor-pointer object-cover"
                          src={u.chapterId.images[0]}
                          alt={u.chapterId.title}
                        />
                      )}
                    </td>

                    <td className={tdClass}>
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className={tdClass}>
                      {u.updatedAt
                        ? new Date(u.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      <button
                        onClick={() => deleteNotify(u._id)}
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
          {allNotify.length === 0 && (
            <div className="p-6 text-center text-gray-500">Notify found</div>
          )}
        </div>
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalNotify}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
    </div>
  );
};
