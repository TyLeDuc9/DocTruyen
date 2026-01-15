import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useFollowButton } from "../../hooks/useFollowStory";
interface FollowButtonProps {
  storyId: string;
}
export const FollowButton: React.FC<FollowButtonProps> = ({ storyId }) => {
  const { isFollowed, handleFollow } = useFollowButton(storyId);
  return (
    <button
      onClick={handleFollow}
      className="absolute top-1 right-1 bg-white/80 p-1 cursor-pointer rounded-sm transition-all duration-300 ease-in-out"
    >
      <FaBookmark
        className={`${
          isFollowed ? "text-red-500" : "text-yellow-400 hover:text-yellow-400/50"
        }`}
      />
    </button>
  );
};
