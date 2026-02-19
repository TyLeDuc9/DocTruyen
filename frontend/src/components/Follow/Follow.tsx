import { FaBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getFollowMe } from "../../redux/Follow/followThunk";
import { Link } from "react-router-dom";
import { FollowButton } from "../../components/Button/FollowButton";
import type { RootState, AppDispatch } from "../../redux/store";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useSavedHistoryStory } from "../../hooks/useSavedHistoryStory";
import React, { useEffect } from "react";
export const Follow: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { follows, loading, error } = useSelector(
    (state: RootState) => state.follow,
  );
  const { handleSavedHistoryStory } = useSavedHistoryStory();

  useEffect(() => {
    dispatch(getFollowMe());
  }, [dispatch]);
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (follows.length === 0) {
    return <p>Bạn chưa theo dõi truyện nào</p>;
  }

  return (
    <div className="w-full">
      <div className="text-yellow-500 font-medium uppercase items-center mb-4 flex text-base lg:text-lg">
        <FaBookmark className="mr-1" />
        <h2 className="">Truyện đang theo dõi</h2>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4 my-4 ml-2">
        {follows.map((item) => (
          <div
            key={item.storyId._id}
            onClick={() => handleSavedHistoryStory(item.storyId._id)}
            className="lg:w-44 w-36 relative"
          >
            <FollowButton storyId={item.storyId._id} />
            <Link to={`/manga/${item.storyId.slug}`}>
              <img
                src={item.storyId.thumbnail}
                alt={item.storyId.name}
                className="w-full h-auto rounded overflow-hidden"
              />

              <h3 className="mt-2 lg:text-base text-xs hover:text-[#236288] font-semibold text-center line-clamp-1 cursor-pointer">
                {item.storyId.name}
              </h3>
            </Link>

            <span className="block text-center text-[10px] lg:text-[13px] font-medium hover:text-[#236288]">
              Chương {item.storyId.totalChapters}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
