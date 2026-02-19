import { useNavigate } from "react-router-dom";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { useAllChapterReport } from "../../hooks/useAllChapterReport";
import { FilterReport } from "../../components/Filter/FilterReport";
import type { ChapterReportStatus } from "../../types/chapterReportType";
import { useDeleteChapterReport } from "../../hooks/useDeleteChapterReport";
export const ChapterReport = () => {
  const {
    allReport,
    loading,
    error,
    totalReport,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    setSearchText,
    searchText,
  } = useAllChapterReport();
  const tdClass = "p-3 border border-gray-200 text-sm";
  const navigate = useNavigate();
  const thClass = "p-3 border border-white/10";
  const actionBtn = "px-4 py-2 text-xs font-medium rounded transition-colors";
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);
  
  const { deleteChapterReport, error:deleteReport }=useDeleteChapterReport( () => {
      updateFilter({ ...filters });
    },)
  const statusClass: Record<ChapterReportStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    FIXED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };
  if (loading) return <ComponentLoading />;
  if (error || deleteReport) {
    return <div>{error || deleteReport}</div>;
  }
  return (
    <div className="space-y-4 p-4">
      <FilterReport
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
              Total reports:
              <span className="font-semibold">{totalReport}</span>
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
                  <th className={thClass}>Email</th>
                  <th className={thClass}>Chapter tittle</th>
                  <th className={thClass}>Reason</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Note</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>

                  <th className={thClass}>Delete</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allReport.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {c.userId?.email || "khong co"}
                    </td>
                    <td className={tdClass}>
                      <button
                        onClick={() =>
                          navigate(`/chapter/detail/${c.chapterId.slug}`)
                        }
                        className="text-main font-medium cursor-pointer"
                      >
                        {c.chapterId?.title || ""}
                      </button>
                    </td>
                    <td className={tdClass}>{c.reason}</td>
                    <td className={tdClass}>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${statusClass[c.status]}`}
                      >
                        {c.status}
                      </span>
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
                        navigate(`/admin/chapter-report/update/${c._id}`)
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
                      onClick={()=>deleteChapterReport(c._id)}
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
      </div>
      <div className="mt-4">
        <PaginationItem
          currentPage={filters.page || 1}
          pageSize={filters.limit || 20}
          total={totalReport}
          onChange={(page) => updateFilter({ page })}
        />
      </div>
    </div>
  );
};
