import React from "react";
import type { StoryStatus, GetStoryParams } from "../../types/storyType";
import type { Category } from "../../types/categoryType";

interface FilterStoryProps {
  categories: Category[];
  filters: GetStoryParams;
  onCategoryChange: (slug: string) => void;
  onSortChange: (sort: "newest" | "oldest") => void;
  onStatusChange: (status: StoryStatus) => void;
  onCountryChange: (country: string) => void;
}

export const FilterStory: React.FC<FilterStoryProps> = ({
  categories,
  filters,
  onCategoryChange,
  onSortChange,
  onStatusChange,
  onCountryChange,
}) => {
  return (
    <div className="bg-white shadow-lg my-6 p-4 sm:p-6 rounded-xl">
      {/* Thể loại */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
        <p className="font-semibold text-main sm:w-28">Thể loại</p>
        <select
          className="w-full sm:w-48 px-4 py-2 rounded-lg border border-blue-300 
          bg-white shadow-sm text-gray-800 focus:outline-none transition cursor-pointer"
          onChange={(e) => onCategoryChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Tất cả</option>
          {categories.map((item) => (
            <option key={item._id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tình trạng */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-4 text-sm">
        <p className="font-semibold text-main sm:w-28">Tình trạng</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`border border-blue-300 px-4 py-2 rounded-lg transition 
              ${filters.status === "ONGOING" ? "bg-main text-white" : "bg-white"}`}
            onClick={() => onStatusChange("ONGOING")}
          >
            Đang tiến hành
          </button>
          <button
            className={`border border-blue-300 px-4 py-2 rounded-lg transition 
              ${filters.status === "COMPLETED" ? "bg-main text-white" : "bg-white"}`}
            onClick={() => onStatusChange("COMPLETED")}
          >
            Hoàn thành
          </button>
        </div>
      </div>

      {/* Quốc gia */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-4 text-sm">
        <p className="font-semibold text-main sm:w-28">Quốc gia</p>
        <div className="flex flex-wrap gap-2">
          {["Việt Nam", "Nhật Bản", "Mỹ", "Hàn", "Trung Quốc"].map(
            (country) => (
              <button
                key={country}
                className={`border border-blue-300 px-4 py-2 rounded-lg transition 
                  ${
                    filters.country === country
                      ? "bg-main text-white"
                      : "bg-white"
                  }`}
                onClick={() => onCountryChange(country)}
              >
                {country}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Sắp xếp */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
        <p className="font-semibold text-main sm:w-28">Sắp xếp</p>
        <select
          className="w-full sm:w-40 px-4 py-2 rounded-lg border border-blue-300 
          bg-white shadow-sm text-gray-800 focus:outline-none transition cursor-pointer"
          value={filters.sort}
          onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
    </div>
  );
};
