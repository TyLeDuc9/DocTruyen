import { FiSearch, FiRefreshCcw, FiFilter } from "react-icons/fi";
import type { GetStoryParams } from "../../types/storyType";
import type { Category } from "../../types/categoryType";
type Props = {
  filters: GetStoryParams;
  updateFilter: (data: Partial<GetStoryParams>) => void;
  handleReset: () => void;
  handleSearch: () => void;
  searchText: string;
  setSearchText: (value: string) => void;
  categories: Category[];
};

export const FilterStory = ({
  filters,
  updateFilter,
  handleReset,
  handleSearch,
  searchText,
  setSearchText,
  categories,
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
              Story Filters
            </h2>
            <p className="text-sm text-gray-500">
              Search and filter story faster
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
        <div className="flex flex-col gap-1">
          <label className={labelCss}>Search</label>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 focus-within:border-main">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter name..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCss}>Category</label>
          <select
            className={selectClass}
            value={filters.categorySlug || ""}
            onChange={(e) =>
              updateFilter({
                categorySlug: e.target.value || undefined,
                page: 1,
              })
            }
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCss}>Status</label>
          <select
            value={filters.status || ""}
            onChange={(e) =>
              updateFilter({
                status: e.target.value
                  ? (e.target.value as
                      | "UPCOMING"
                      | "ONGOING"
                      | "COMPLETED"
                      | "DROPPED")
                  : undefined,
                page: 1,
              })
            }
            className={selectClass}
          >
            <option value="">All</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="DROPPED">Dropped</option>
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
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          onClick={handleSearch}
          type="button"
          className="w-full cursor-pointer rounded-lg bg-main px-4 py-2 text-sm font-medium text-white hover:opacity-90 sm:w-auto"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
