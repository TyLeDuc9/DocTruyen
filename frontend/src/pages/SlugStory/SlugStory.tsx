import { Link, useParams } from "react-router-dom";
import { useStorySlug } from "../../hooks/useStorySlug";
import { useChapterStorySlug } from "../../hooks/useChapterStorySlug";
import { Comment } from "../../components/Comment/Comment";
import { ToastContainer } from "react-toastify";
import {
  FaUser,
  FaEye,
  FaGlobeAsia,
  FaSyncAlt,
  FaBookOpen,
  FaPlus,
  FaInfoCircle,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Chapter } from "../Chapter/Chapter";
import { getCount } from "../../redux/Favorite/favoriteThunk";
import { getCountFollow } from "../../redux/Follow/followThunk";
import { ActionButton } from "../../components/Button/ActionButton";
import type { RootState, AppDispatch } from "../../redux/store";
import { CommentList } from "../../components/Comment/CommentList";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";

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

  const dispatch = useDispatch<AppDispatch>();
  const { count } = useSelector((state: RootState) => state.favorite);
  const { countFollow } = useSelector((state: RootState) => state.follow);

  const [active, setActive] = useState(false);
  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading, setComponentsLoading]);

  useEffect(() => {
    if (storySlug?._id) {
      dispatch(getCount(storySlug._id));
      dispatch(getCountFollow(storySlug._id));
    }
  }, [storySlug?._id, dispatch]);

  if (loading || loadingChapter) return <ComponentLoading />;
  if (error || errorChapter)
    return <p className="text-center text-red-500">{error}</p>;
  if (!storySlug) return null;

  return (
    <div className="w-[95%] md:w-[85%] lg:w-[80%] mx-auto">

      {/* Breadcrumb */}
      <div className="bg-gray-50 my-4 md:my-6 p-3 md:p-4 text-sm rounded shadow-sm">
        <Link to="/" className="font-medium hover:text-[#236288]">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium">{storySlug.name}</span>
      </div>

      {/* Main Card */}
      <div className="bg-white p-4 md:p-6 rounded shadow my-6">

        <div className="flex flex-col md:flex-row gap-6">

          {/* Thumbnail */}
          <div className="flex justify-center md:block">
            <img
              src={storySlug.thumbnail}
              alt={storySlug.name}
              className="w-40 h-56 md:w-44 md:h-60 rounded shadow object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">

            <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
              {storySlug.name}
            </h1>

            <div className="space-y-2 text-gray-700 text-sm md:text-base">

              {Array.isArray(storySlug.alternateName) &&
                storySlug.alternateName.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <FaPlus className="text-gray-500" />
                    <span className="font-medium">Tên khác:</span>
                    <span>{storySlug.alternateName.join(", ")}</span>
                  </div>
                )}

              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium">Tác giả:</span>
                <span>{storySlug.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaSyncAlt className="text-gray-500" />
                <span className="font-medium">Tình trạng:</span>
                <span>{statusMap[storySlug.status]}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaGlobeAsia className="text-gray-500" />
                <span className="font-medium">Quốc gia:</span>
                <span>{storySlug.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaEye className="text-gray-500" />
                <span className="font-medium">Lượt xem:</span>
                <span>
                  {storySlug.views.toLocaleString("vi-VN")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaBookOpen className="text-gray-500" />
                <span className="font-medium">Số chương:</span>
                <span>{storySlug.totalChapters}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaHeart className="text-gray-500" />
                <span className="font-medium">Lượt thích:</span>
                <span>{count}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaBookmark className="text-gray-500" />
                <span className="font-medium">Lượt theo dõi:</span>
                <span>{countFollow}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {Array.isArray(storySlug.categoryId) &&
                storySlug.categoryId.map((cat: any) => (
                  <Link
                    key={cat._id}
                    to={`/the-loai/${cat.slug}`}
                    className="px-3 py-2 text-xs md:text-sm border border-blue-200 text-[#236288] rounded-sm 
                    hover:bg-[#236288] hover:text-white transition"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>

            {/* Action Button */}
            <div className="mt-4">
              <ActionButton
                chapters={chapters}
                storyId={storySlug._id}
              />
            </div>
          </div>
        </div>

        {/* ===== Giới thiệu ===== */}
        <div className="mt-6 md:mt-8">
          <h2 className="flex items-center gap-2 text-base md:text-lg font-semibold mb-2 text-[#236288]">
            <FaInfoCircle />
            Giới thiệu
          </h2>

          <p
            className={`text-gray-600 text-sm md:text-base leading-relaxed ${
              !active ? "line-clamp-3" : ""
            }`}
          >
            {storySlug.description}
          </p>

          <button
            onClick={() => setActive(!active)}
            className="text-[#236288] text-sm mt-2"
          >
            {active ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>

        {/* Chapter */}
        <div className="mt-8">
          <Chapter />
        </div>

        {/* Comment */}
        <div className="mt-8">
          <Comment storyId={storySlug._id} />
          <CommentList storyId={storySlug._id} />
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{
          fontSize: window.innerWidth < 768 ? "12px" : "16px",
          minWidth: window.innerWidth < 768 ? "120px" : "200px",
        }}
      />
    </div>
  );
};