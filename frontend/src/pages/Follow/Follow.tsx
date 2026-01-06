import React, { useEffect } from "react";
import {useSelector,useDispatch } from "react-redux";
import { getFollowMe } from "../../redux/Follow/followThunk";
import { Link } from "react-router-dom";
import { FollowButton } from "../../components/Button/FollowButton";
import type { RootState, AppDispatch } from "../../redux/store";
export const Follow: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { follows, loading, error } = useSelector(
    (state: RootState) => state.follow
  );

 useEffect(() => {
  dispatch(getFollowMe());
}, [dispatch]);

  if (loading) return <p>Đang tải danh sách theo dõi...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (follows.length === 0) {
    return <p>Bạn chưa theo dõi truyện nào</p>;
  }

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-10 w-[85%] mx-auto my-8">
      {follows.map((item) => (
        <div key={item.storyId._id} className="w-44 relative">
          <FollowButton storyId={item.storyId._id} />
          <Link to={`/manga/${item.storyId.slug}`}>
            <img
              src={item.storyId.thumbnail}
              alt={item.storyId.name}
              className="w-full h-auto rounded overflow-hidden"
            />

            <h3 className="mt-2 text-base hover:text-[#236288] font-semibold text-center line-clamp-1 cursor-pointer">
              {item.storyId.name}
            </h3>
          </Link>

          <span className="block mt-1 text-center text-[13px] font-medium hover:text-[#236288]">
            Chương {item.storyId.totalChapters}
          </span>
        </div>
      ))}
    </div>
  );
};
