import { FiSearch, FiRefreshCcw } from "react-icons/fi";
import type {
  GetAllChapterReportParams,
  ChapterReportStatus,
} from "../../types/chapterReportType";

type Props = {
  filters: GetAllChapterReportParams;
  updateFilter: (data: Partial<GetAllChapterReportParams>) => void;
  handleReset: () => void;
  handleSearch: () => void;
  searchText: string;
  setSearchText: (value: string) => void;
};

export const FilterReport = ({
  filters,
  updateFilter,
  handleReset,
  handleSearch,
  searchText,
  setSearchText,
}: Props) => {
  const labelCss = "text-sm font-medium text-main";
  const selectClass =
    "rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-400";
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Report Filters</h2>
        <button
          onClick={handleReset}
          type="button"
          className="flex items-center gap-2 rounded-lg cursor-pointer
          border border-red-200 bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-400"
        >
          <FiRefreshCcw />
          Reset
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-3">
        {/* Search */}
        <div className="flex flex-col gap-1">
          <label className={labelCss}>Search</label>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 focus-within:border-main">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              value={searchText}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter name..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className={labelCss}>Type</label>{" "}
          <select
            value={filters.status || ""}
            onChange={(e) =>
              updateFilter({
                status: e.target.value
                  ? (e.target.value as ChapterReportStatus)
                  : undefined,
                page: 1,
              })
            }
            className={selectClass}
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="FIXED">Fixed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCss}>Sort</label>
          <select
            className={selectClass}
            value={filters.sort || ""}
            onChange={(e) =>
              updateFilter({ sort: e.target.value as "newest" | "oldest" })
            }
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};
