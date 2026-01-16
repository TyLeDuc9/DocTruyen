import { FiClock } from "react-icons/fi";
import { useGetHistoryStory } from "../../hooks/useGetHistoryStory";
import { FollowButton } from "../Button/FollowButton";
import { Link } from "react-router-dom";

export const HistoryStory = () => {
  const { historyStory, loading, error } = useGetHistoryStory();

  if (loading) return <p>Đang tải danh sách lịch sử...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <div className="text-yellow-500 font-medium uppercase items-center mb-4 text-xl flex">
        <FiClock className="mr-1" />
        <h2>Lịch sử xem</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 my-4">
        {historyStory.map((item) => (
          <div key={item.story.id} className="w-44 relative">
            <FollowButton storyId={item.story.id} />

            <Link to={`/manga/${item.story.slug}`}>
              <img
                src={item.story.thumbnail}
                alt={item.story.name}
                className="w-full h-auto rounded overflow-hidden"
              />

              <h3 className="mt-2 text-base hover:text-[#236288] font-semibold text-center line-clamp-1 cursor-pointer">
                {item.story.name}
              </h3>
            </Link>

            <span className="block text-center text-[13px] font-medium hover:text-[#236288]">
              Chương {item.story.totalChapters}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
