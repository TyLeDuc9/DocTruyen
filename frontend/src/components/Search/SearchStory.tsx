import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAllStory } from "../../hooks/useAllStory";

export const SearchStory = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { allStory, updateFilter } = useAllStory();


  useEffect(() => {
    if (keyword.trim()) {
      updateFilter({ keyword: keyword.trim() });
    }
  }, [keyword]);

  const handleSearch = (value: string) => {
    navigate(`/search?keyword=${encodeURIComponent(value)}&page=1`);
    setKeyword("");
  };

  const handleGoDetail = (slug: string) => {
    navigate(`/manga/${slug}`);
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
          if (e.key === "Enter" && keyword.trim()) {
            handleSearch(keyword.trim());
          }
        }}
        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
      />

      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#236288]"
        size={18}
      />


      {keyword.trim() && allStory.length > 0 && (
        <div className="absolute top-full w-full bg-white shadow-lg rounded-lg z-50">
          {allStory.slice(0, 5).map((item) => (
            <div
              key={item._id}
              onClick={() => handleGoDetail(item.slug)}
              className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer text-sm"
            >
              <img
                className="w-16 h-20 object-cover"
                src={item.thumbnail}
                alt={item.name}
              />

              <div className="mx-4">
                <h1 className="text-main font-medium">{item.name}</h1>
                <span className="font-medium text-xs">
                  Chương {item.totalChapters}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
