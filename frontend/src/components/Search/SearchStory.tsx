import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchStory = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(value.trim())}&page=1`);
    setKeyword("");
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(keyword);
        }}
        className="w-full lg:pl-10 pl-8 lg:pr-4 py-2 lg:py-3 lg:text-base sm:text-base text-xs 
        rounded-lg bg-gray-100 focus:outline-none"
      />

      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#236288]"
        size={16}
      />
    </div>
  );
};