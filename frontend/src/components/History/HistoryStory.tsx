import { FiClock } from "react-icons/fi";
import { useGetHistoryStory } from "../../hooks/useGetHistoryStory";
import { FollowButton } from "../Button/FollowButton";
import { Link } from "react-router-dom";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useEffect } from "react";
export const HistoryStory = () => {
  const { historyStory, loading, error } = useGetHistoryStory();
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <div className="text-yellow-500 font-medium uppercase items-center mb-4 flex text-base lg:text-lg">
        <FiClock className="mr-1" />
        <h2>Lịch sử xem</h2>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4 my-4 ml-2">
        {historyStory.map((item) => (
          <div key={item.story.id} className="lg:w-44 w-36 relative">
            <FollowButton storyId={item.story.id} />

            <Link to={`/manga/${item.story.slug}`}>
              <img
                src={item.story.thumbnail}
                alt={item.story.name}
                className="w-full h-auto rounded overflow-hidden"
              />

              <h3 className="mt-2 lg:text-base text-xs hover:text-[#236288] font-semibold text-center line-clamp-1 cursor-pointer">
                {item.story.name}
              </h3>
            </Link>

            <span className="block text-center text-[10px] lg:text-[13px] font-medium hover:text-[#236288]">
              Chương {item.story.totalChapters}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
