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
    <div className="bg-white shadow-lg my-8 p-6">
      {/* Thể loại */}
      <div className="flex items-center gap-4 text-sm">
        <p className="font-semibold text-main">Thể loại</p>
        <select
          className="w-36 px-4 py-1 ml-8 rounded-lg border border-blue-300 
          bg-white shadow-sm text-gray-800 focus:outline-none  transition cursor-pointer"
          onChange={(e) => onCategoryChange(e.target.value)}
          defaultValue=""
        >
          {categories.map((item) => (
            <option key={item._id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tình trạng */}
      <div className="flex items-center gap-4 my-4 text-sm">
        <p className="font-semibold text-main">Tình trạng</p>
        <button
          className={`border border-blue-300 p-2 cursor-pointer rounded-lg ml-4 ${filters.status==='ONGOING'?"bg-main text-white":''}`}
          onClick={() => onStatusChange("ONGOING")}
        >
          Đang tiến hành
        </button>
        <button
          className={`border border-blue-300 p-2 rounded-lg cursor-pointer ${filters.status==='COMPLETED'?'bg-main text-white':''}`}
          onClick={() => onStatusChange("COMPLETED")}
        >
          Hoàn thành
        </button>
      </div>

      {/* Quốc gia */}
      <div className="flex items-center gap-4 my-4">
        <p className="font-semibold text-main text-sm">Quốc gia</p>
        {["Việt Nam", "Nhật Bản", "Mỹ", "Hàn", "Trung Quốc"].map((country) => (
          <button
            key={country}
            className={`border border-blue-300 cursor-pointer py-2 text-sm px-4 rounded-lg ml-6 ${filters.country===country?'bg-main text-white':''}`}
            onClick={() => onCountryChange(country)}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Sắp xếp */}
      <div className="flex items-center gap-4 text-sm">
        <p className="font-semibold text-main">Sắp xếp</p>
        <select
          className="w-32 px-4 py-1 ml-8 rounded-lg border border-blue-300 
          bg-white shadow-sm text-gray-800 focus:outline-none transitioncursor-pointer"
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
