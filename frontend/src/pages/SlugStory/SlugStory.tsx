import { Link, useParams } from "react-router-dom";
import { useStorySlug } from "../../hooks/useStorySlug";
import { useNavigate } from "react-router-dom";
import { useChapterStorySlug } from "../../hooks/useChapterStorySlug";
import { FiThumbsUp} from "react-icons/fi";
import {
  FaUser,
  FaEye,
  FaGlobeAsia,
  FaSyncAlt,
  FaBookOpen,
  FaPlus,
  FaPlay,
  FaListUl,
  FaBookmark,
  FaInfoCircle,

} from "react-icons/fa";
import { useState } from "react";
import { Chapter } from "../Chapter/Chapter";

const statusMap: Record<string, string> = {
  ONGOING: "Đang cập nhật",
  COMPLETED: "Hoàn thành",
  UPCOMING: "Sắp ra mắt",
  DROPPED: "Tạm ngưng",
};

export const SlugStory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { storySlug, loading, error } = useStorySlug(slug!);
  const {
    chapters,
    loading: loadingChapter,
    error: errorChapter,
  } = useChapterStorySlug(slug!);

  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleFirstChapter = () => {
    if (!chapters || chapters.length === 0) return;
    const firstChapter = chapters[0];
    navigate(`/chapter/detail/${firstChapter.slug}`);
  };

  const handleNewChapter = () => {
    if (!chapters || chapters.length === 0) return;

    const latestChapter = chapters[chapters.length - 1];
    navigate(`/chapter/detail/${latestChapter.slug}`);
  };

  if (loading || loadingChapter)
    return <p className="text-center my-8">Đang tải truyện...</p>;
  if (error || errorChapter)
    return <p className="text-center text-red-500">{error}</p>;
  if (!storySlug) return null;

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gray-50 my-6 p-4 text-sm rounded shadow-sm">
        <Link to="/" className="font-medium hover:text-[#236288]">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium">{storySlug.name}</span>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex gap-6">
          <img
            src={storySlug.thumbnail}
            alt={storySlug.name}
            className="w-44 h-60 rounded-sm shadow"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-4">{storySlug.name}</h1>

            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">
                {Array.isArray(storySlug.alternateName) &&
                  storySlug.alternateName.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FaPlus className="text-gray-500" />
                      <span className="font-medium">Tên khác:</span>
                      <span>{storySlug.alternateName.join(", ")}</span>
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium">Tác giả:</span>
                <span className="">{storySlug.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaSyncAlt className="text-gray-500" />
                <span className="font-medium">Tình trạng:</span>
                <span className="">{statusMap[storySlug.status]}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaGlobeAsia className="text-gray-500" />
                <span className="font-medium">Quốc gia:</span>
                <span className="">{storySlug.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaEye className="text-gray-500" />
                <span className="font-medium">Lượt xem:</span>
                <span className="">
                  {storySlug.views.toLocaleString("vi-VN")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaBookOpen className="text-gray-500" />
                <span className="font-medium">Số chương:</span>
                <span className=" ">{storySlug.totalChapters}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.isArray(storySlug.categoryId) &&
                storySlug.categoryId.map((cat: any) => (
                  <Link
                    key={cat._id}
                    to={`/the-loai/${cat.slug}`}
                    className="px-3 py-1 border border-blue-100 text-[#236288] rounded-sm 
                    hover:bg-blue-300 hover:text-white transition"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>

            <div className="flex gap-4 mt-6 flex-wrap">
              <button
                onClick={handleFirstChapter}
                className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-blue-400 text-white rounded hover:opacity-90 transition"
              >
                <FaPlay />
                Đọc từ đầu
              </button>

              <button
                onClick={handleNewChapter}
                className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-red-400 text-white rounded hover:opacity-90 transition"
              >
                <FaListUl />
                Đọc mới nhất
              </button>

              <button className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-green-400 text-white rounded hover:opacity-90 transition">
                <FaBookmark />
                Theo dõi
              </button>

              <button className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-pink-400 text-white rounded hover:opacity-90 transition">
                <FiThumbsUp />
                Thích
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-2 text-[#236288]">
            <FaInfoCircle />
            Giới thiệu
          </h2>
          <p
            className={`text-gray-500 leading-relaxed  ${
              !active ? "line-clamp-3" : ""
            }`}
          >
            {storySlug.description}
          </p>
          <button
            onClick={() => setActive(!active)}
            className="text-main cursor-pointer text-center"
          >
            {active ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
        <Chapter />
      </div>
    </div>
  );
};
