import {
  FaChevronLeft,
  FaChevronRight,
  FaBookmark,
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Chapter } from "../../types/chapterType";
import { useDispatch, useSelector } from "react-redux";
import { createFollow, deleteFollow } from "../../redux/Follow/followThunk";
import type { RootState, AppDispatch } from "../../redux/store";
type ChapterToolbarProps = {
  handlePrev: () => void;
  handleNext: () => void;
  chapters: Chapter[];
  currentSlug?: string;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  storyId: string;
};

export const ChapterToolbar = ({
  handlePrev,
  handleNext,
  chapters,
  currentSlug,
  nextChapter,
  prevChapter,
  storyId,
}: ChapterToolbarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const isFollowed = useSelector((state: RootState) =>
    state.follow.follows.some((follow) => follow.storyId._id === storyId)
  );
  const handleFollow = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để theo dõi truyện");
      return;
    }
    if (isFollowed) {
      dispatch(deleteFollow(storyId));
    } else {
      dispatch(createFollow({ storyId }));
    }
  };
  const handleChangeChapter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug) {
      navigate(`/chapter/detail/${slug}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-950/70 text-white z-50">
      <div className="flex justify-center items-center py-2 gap-4">
        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="text-3xl cursor-pointer hover:text-blue-400"
          title="Trang chủ"
        >
          <FaHome />
        </button>

        {/* Prev */}
        <button
          disabled={!prevChapter}
          onClick={handlePrev}
          className={`rounded-full p-2 ${
            !prevChapter
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-main text-white hover:text-blue-300 cursor-pointer"
          }`}
          title="Chương trước"
        >
          <FaChevronLeft />
        </button>

        {/* Select chapter */}
        <select
          value={currentSlug}
          onChange={handleChangeChapter}
          className="px-2 py-1 rounded bg-white text-black max-w-[400px]"
        >
          {chapters.map((chap) => (
            <option key={chap._id} value={chap.slug}>
              Chương {chap.displayNumber}
            </option>
          ))}
        </select>

        {/* Next */}
        <button
          disabled={!nextChapter}
          onClick={handleNext}
          className={`rounded-full p-2 ${
            !nextChapter
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-main text-white hover:text-blue-300 cursor-pointer"
          }`}
          title="Chương sau"
        >
          <FaChevronRight />
        </button>

        {/* Follow */}
        <button
          onClick={handleFollow}
          className="flex items-center gap-1 bg-white px-2 py-1 rounded-sm text-black cursor-pointer"
        >
          <FaBookmark
            className={`${
              isFollowed ? "text-red-500" : "text-yellow-400"
            }`}
          />
          {isFollowed?"Đã theo dõi":'Theo dõi'}
        </button>
      </div>
    </div>
  );
};
