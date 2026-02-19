import { useGetHistoryChapter } from "../../hooks/useGetHistoryChapter";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { useNavigate } from "react-router-dom";
import { deleteChapterApi } from "../../services/readingHistory";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
export const HistoryChapter = () => {
  const navigate = useNavigate();
  const {
    historyChapter,
    filters,
    updateFilter,
    loading,
    error,
    totalChapters,
  } = useGetHistoryChapter();

  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);

  if (loading) return <ComponentLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      await deleteChapterApi({ chapterId });
      updateFilter({});
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại!");
    }
  };

  return (
    <div className="w-full">

      {/* Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Sắp xếp:</span>

        <select
          value={filters.sort}
          onChange={(e) =>
            updateFilter({
              sort: e.target.value as "newest" | "oldest",
              page: 1,
            })
          }
          className="border border-blue-500 rounded-lg px-3 py-1.5 text-sm 
                     focus:outline-none cursor-pointer w-full sm:w-auto"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {/* Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 
          my-5
        "
      >
        {historyChapter.map((item) => (
          <div
            key={item.lastChapter.id}
            className="group relative rounded-xl p-3 sm:p-4 bg-white shadow-sm hover:shadow-md transition duration-200"
          >
            <button
              onClick={() => handleDeleteChapter(item.lastChapter.id)}
              className="absolute top-2 right-2 text-red-500 text-lg hover:text-red-400"
            >
              <FiX />
            </button>

            <h3
              onClick={() =>
                navigate(`/chapter/detail/${item.lastChapter.slug}`)
              }
              className="font-semibold text-sm sm:text-base text-main line-clamp-2 cursor-pointer"
            >
              {item.lastChapter.title}
            </h3>

            <span className="text-sm font-medium block mt-1">
              Chương {item.lastChapter.displayNumber}
            </span>

            <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-2">
              ⏰ {new Date(item.lastReadAt).toLocaleString("vi-VN")}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationStory
          currentPage={filters.page || 1}
          pageSize={filters.limit || 20}
          total={totalChapters}
          onChange={(page) => updateFilter({ page })}
        />
      </div>
    </div>
  );
};