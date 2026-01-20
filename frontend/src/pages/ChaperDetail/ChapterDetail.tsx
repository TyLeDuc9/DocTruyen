import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBug, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useChapterStorySlug } from "../../hooks/useChapterStorySlug";
import { useChapterDetail } from "../../hooks/useChapterDetail";
import { ChapterToolbar } from "../../components/ChapterToolbar/ChapterToolbar";
import { CommentChapter } from "../../components/CommentChapter/CommentChapter";
import { CommentChapterList } from "../../components/CommentChapter/CommentChapterList";
export const ChapterDetail = () => {
  const { chapterSlug } = useParams<{ chapterSlug: string }>();
  const navigate = useNavigate();
  const { chapterDetail, story, loading, error } = useChapterDetail(
    chapterSlug!,
  );
  const { chapters, loading: loadingChapters } = useChapterStorySlug(
    story?.slug || "",
  );

  const currentIndex = chapters.findIndex(
    (c) => c.slug === chapterDetail?.slug,
  );

  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;

  const nextChapter =
    currentIndex >= 0 && currentIndex < chapters.length - 1
      ? chapters[currentIndex + 1]
      : null;

  const handlePrev = () => {
    if (prevChapter) {
      navigate(`/chapter/detail/${prevChapter.slug}`);
    }
  };

  const handleNext = () => {
    if (nextChapter) {
      navigate(`/chapter/detail/${nextChapter.slug}`);
    }
  };

  if (loading || loadingChapters) {
    return <p className="text-center my-8">Đang tải truyện...</p>;
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="container">
        <div className="pt-8">
          <div className="bg-gray-50 py-8 p-4 text-sm shadow-sm rounded-lg">
            <Link to="/" className="hover:text-[#236288]">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link to={`/manga/${story?.slug}`}>{story?.name}</Link>
            <span className="mx-2">/</span>
            <Link to={`/chapter/detail/${chapterDetail?.slug}`}>
              Chương {chapterDetail?.displayNumber}
            </Link>
            <div className="flex items-center">
              <h1 className="uppercase text-base my-4 font-medium">
                {chapterDetail?.title}
              </h1>
              <p className="mx-6 text-gray-500">
                ( Cập nhật lúc:
                <span className="lowercase text-sm font-normal ml-1">
                  {chapterDetail?.updatedAt &&
                    new Date(chapterDetail.updatedAt).toLocaleString("vi-VN")}
                </span>
                )
              </p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 px-4 py-2 text-white rounded-sm 
                     hover:bg-red-400 cursor-pointer
                     flex items-center gap-2"
              >
                <FaBug />
                Báo lỗi chương
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrev}
                disabled={!prevChapter}
                className={`mx-2 px-4 py-2 rounded-sm flex items-center
                ${
                  !prevChapter
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-main text-white hover:text-blue-300 cursor-pointer"
                }`}
              >
                <FaChevronLeft />
                Chap trước
              </button>

              <button
                onClick={handleNext}
                disabled={!nextChapter}
                className={`mx-2 px-4 py-2 rounded-sm flex items-center
                ${
                  !nextChapter
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-main text-white hover:text-blue-300 cursor-pointer"
                }`}
              >
                Chap sau
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pb-12">
        <div className="flex flex-col items-center gap-2">
          {chapterDetail?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Trang ${index + 1}`}
              className="w-full max-w-5xl object-contain"
              loading="lazy"
            />
          ))}
        </div>
        <div className="container">
          <div className="pt-8">
            <div className="bg-gray-50 py-8 p-4 text-sm shadow-sm rounded-lg">
              <div className="flex justify-center mt-2">
                <button
                  className="bg-red-500 px-4 py-2 text-white rounded-sm 
                     hover:bg-red-400 cursor-pointer
                     flex items-center gap-2"
                >
                  <FaBug />
                  Báo lỗi chương
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={!prevChapter}
                  className={`mx-2 px-4 py-2 rounded-sm flex items-center
                ${
                  !prevChapter
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-main text-white hover:text-blue-300 cursor-pointer"
                }`}
                >
                  <FaChevronLeft />
                  Chap trước
                </button>

                <button
                  onClick={handleNext}
                  disabled={!nextChapter}
                  className={`mx-2 px-4 py-2 rounded-sm flex items-center
                ${
                  !nextChapter
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-main text-white hover:text-blue-300 cursor-pointer"
                }`}
                >
                  Chap sau
                  <FaChevronRight />
                </button>
              </div>
              <Link to="/" className="hover:text-[#236288]">
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <Link to={`/manga/${story?.slug}`}>{story?.name}</Link>
              <span className="mx-2">/</span>
              <Link to={`/chapter/detail/${chapterDetail?.slug}`}>
                Chương {chapterDetail?.displayNumber}
              </Link>
              {chapterDetail && (
                <>
                  <CommentChapter chapterId={chapterDetail._id} />
                  <CommentChapterList chapterId={chapterDetail._id} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {story && (
        <ChapterToolbar
          chapterId={chapterDetail?._id}
          handlePrev={handlePrev}
          handleNext={handleNext}
          chapters={chapters}
          currentSlug={chapterDetail?.slug}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          storyId={story._id}
        />
      )}
    </div>
  );
};
