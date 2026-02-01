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
    <div>
      <div className="mb-4 flex items-center gap-2">
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
               focus:outline-none cursor-pointer"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5">
        {historyChapter.map((item) => (
          <div
            key={item.lastChapter.id}
            className="group relative rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition duration-200"
          >
            <button
              onClick={() => handleDeleteChapter(item.lastChapter.id)}
              className="absolute top-0 right-0 text-red-500 text-lg cursor-pointer hover:text-red-400"
            >
              <FiX />
            </button>

            <h3
              onClick={() =>
                navigate(`/chapter/detail/${item.lastChapter.slug}`)
              }
              className="font-semibold text-base text-main line-clamp-2 cursor-pointer"
            >
              {item.lastChapter.title}
            </h3>
            <span className="text-sm font-medium">
              Chương {item.lastChapter.displayNumber}
            </span>

            <p className="text-sm text-gray-500 flex items-center gap-1">
              ⏰ {new Date(item.lastReadAt).toLocaleString("vi-VN")}
            </p>
          </div>
        ))}
      </div>

      <PaginationStory
        currentPage={filters.page || 1}
        pageSize={filters.limit || 20}
        total={totalChapters}
        onChange={(page) => updateFilter({ page })}
      />
    </div>
  );
};
