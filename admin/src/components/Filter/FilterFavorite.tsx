import { FiRefreshCcw, FiFilter } from "react-icons/fi";
import type { BaseFilterParams } from "../../types/filterParams";
type Props = {
  filters: BaseFilterParams;
  updateFilter: (data: Partial<BaseFilterParams>) => void;
  handleReset: () => void;
};

export const FilterFavorite = ({
  filters,
  updateFilter,
  handleReset,
}: Props) => {
  const labelCss = "text-sm font-medium text-main";
  const selectClass =
    "rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-400";
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <FiFilter className="text-gray-700" />
          </span>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
             Filters
            </h2>
            <p className="text-sm text-gray-500">
              Search and filter faster
            </p>
          </div>
        </div>

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
      <div className="grid grid-cols-2 gap-3">
        {/* Sort */}
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
