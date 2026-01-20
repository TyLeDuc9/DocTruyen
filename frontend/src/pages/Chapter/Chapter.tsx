import { Link, useParams } from "react-router-dom";
import { useChapterStorySlug } from "../../hooks/useChapterStorySlug";
import { FaBook } from "react-icons/fa";
export const Chapter = () => {
  const { slug } = useParams<{ slug: string }>();
  const { chapters, loading, error } = useChapterStorySlug(slug!);
  if (loading) return <p>Đang tải danh sách chương...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="flex items-center gap-2  my-2 text-lg font-semibold text-main">
        <FaBook />
        Danh sách chương
      </h2>
      <div className="border border-blue-100 rounded-sm">
        {chapters.map((chapter) => (
          <Link
            key={chapter._id}
            to={`/chapter/detail/${chapter.slug}`}
            className="
              flex items-center justify-between border-b border-gray-200
              px-4 py-3 text-sm
              hover:bg-gray-50 transition"
          >
            <span className="hover:text-blue-600 cursor-pointer">
              Chương {chapter.displayNumber}
            </span>
            
            <span className="text-gray-400 text-sm">
              {new Date(chapter.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
