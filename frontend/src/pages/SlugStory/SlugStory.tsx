import { Link, useParams } from "react-router-dom";
import { useStorySlug } from "../../hooks/useStorySlug";
import { useChapterStorySlug } from "../../hooks/useChapterStorySlug";
import { Comment } from "../../components/Comment/Comment";
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
  useEffect(() => {
    if (storySlug?._id) {
      dispatch(getCount(storySlug._id));
      dispatch(getCountFollow(storySlug._id));
    }
  }, [storySlug?._id, dispatch]);
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

      <div className="bg-white p-6 rounded shadow my-8">
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

            <ActionButton chapters={chapters} storyId={storySlug._id} />
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
        <Comment storyId={storySlug._id} />
        <CommentList storyId={storySlug._id}/>
      </div>
    </div>
  );
};
