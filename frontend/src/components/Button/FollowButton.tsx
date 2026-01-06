import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createFollow, deleteFollow } from "../../redux/Follow/followThunk";
import type { RootState, AppDispatch } from "../../redux/store";
interface FollowButtonProps {
  storyId: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ storyId }) => {
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

  return (
    <button
      onClick={handleFollow}
      className="absolute top-1 right-1 bg-white/80 p-1 cursor-pointer rounded-sm transition"
    >
      <FaBookmark
        className={`${
          isFollowed ? "text-red-500" : "text-yellow-400 hover:text-red-400"
        }`}
      />
    </button>
  );
};
