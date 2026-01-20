import { FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Chapter } from "../../types/chapterType";
import { useSavedHistoryChapter } from "../../hooks/useSavedHistoryChapter";

type ChapterToolbarProps = {
  handlePrev: () => void;
  handleNext: () => void;
  chapters: Chapter[];
  currentSlug?: string;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  storyId: string;
  chapterId?: string;
};

export const ChapterToolbar = ({
  handlePrev,
  handleNext,
  chapters,
  currentSlug,
  nextChapter,
  prevChapter,
  storyId,
  chapterId,
}: ChapterToolbarProps) => {
  const { error, saved, handleSavedChapterHistory } = useSavedHistoryChapter(
    chapterId,
    storyId,
  );

  const navigate = useNavigate();
  const handleChangeChapter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug) {
      navigate(`/chapter/detail/${slug}`);
    }
  };
  if (error) return <div>Lỗi tải thể loại</div>;
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
          onClick={handleSavedChapterHistory}
          className={`flex items-center gap-1 px-2 py-1 rounded-sm cursor-pointer
          ${saved ? "bg-green-500 text-white" : "bg-white text-black"}

  `}
        >
          <FiBookOpen className="mt-0.5" />
          {saved ? "Đã lưu" : "Lưu"}
        </button>
      </div>
    </div>
  );
};
