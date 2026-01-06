import React from "react";
import { FaPlay, FaListUl, FaBookmark } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFollow, deleteFollow } from "../../redux/Follow/followThunk";
import type { RootState, AppDispatch } from "../../redux/store";
interface ActionButtonProps {
  chapters: { slug: string }[];
  storyId: string;
}
export const ActionButton: React.FC<ActionButtonProps> = ({
  chapters,
  storyId,
}) => {
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
  const handleFirstChapter = () => {
    if (!chapters || chapters.length === 0) return;
    const firstChapter = chapters[0];
    navigate(`/chapter/detail/${firstChapter.slug}`);
  };

  const handleNewChapter = () => {
    if (!chapters || chapters.length === 0) return;

    const latestChapter = chapters[chapters.length - 1];
    navigate(`/chapter/detail/${latestChapter.slug}`);
  };
  return (
    <div className="flex gap-4 mt-6 flex-wrap">
      <button
        onClick={handleFirstChapter}
        className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-blue-400 text-white rounded hover:opacity-90 transition"
      >
        <FaPlay />
        Đọc từ đầu
      </button>

      <button
        onClick={handleNewChapter}
        className="flex items-center cursor-pointer gap-2 px-5 py-2  bg-green-400 text-white rounded hover:opacity-90 transition"
      >
        <FaListUl />
        Đọc mới nhất
      </button>

      <button
        onClick={handleFollow}
        className="flex items-center gap-2 px-5 py-2 bg-red-400 text-white rounded hover:opacity-90 transition"
      >
        <FaBookmark
          className={`${
            isFollowed ? "text-red-500" : "text-yellow-400 hover:text-red-400"
          }`}
        />
        {isFollowed ? "Đã theo dõi" : "Theo dõi"}
      </button>

      <button className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-pink-400 text-white rounded hover:opacity-90 transition">
        <FiThumbsUp />
        Thích
      </button>
    </div>
  );
};
