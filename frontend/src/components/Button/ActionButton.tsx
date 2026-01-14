import React, { useEffect } from "react";
import { FaPlay, FaListUl, FaBookmark, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createFollow,
  deleteFollow,
  getFollowMe,
} from "../../redux/Follow/followThunk";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  getFavoriteMe,
  createFavorite,
  deleteFavorite,
} from "../../redux/Favorite/favoriteThunk";
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
    state.follow.follows.some((follow) => follow.storyId?._id === storyId)
  );

  const isFavorite = useSelector((state: RootState) =>
    state.favorite.favorites.some(
      (favorite) => favorite.storyId?._id === storyId
    )
  );
  useEffect(() => {
    if (user) {
      dispatch(getFollowMe());
      dispatch(getFavoriteMe());
    }
  }, [user, dispatch]);

  const handleFavorite = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để like truyện");
      return;
    }

    if (isFavorite) {
      dispatch(deleteFavorite(storyId));
    } else {
      dispatch(createFavorite({ storyId }));
    }
  };

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
    <div className="flex flex-wrap gap-4 mt-6">
      {/* Đọc từ đầu */}
      <button
        onClick={handleFirstChapter}
        className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer
      bg-blue-500 text-white  
      shadow-md hover:bg-blue-600  transition-all duration-200"
      >
        <FaPlay className="text-sm" />
        <span className="font-medium">Đọc từ đầu</span>
      </button>

      {/* Đọc mới nhất */}
      <button
        onClick={handleNewChapter}
        className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer
      bg-green-500 text-white  
      shadow-md hover:bg-green-600  transition-all duration-200"
      >
        <FaListUl className="text-sm" />
        <span className="font-medium">Đọc mới nhất</span>
      </button>

      {/* Theo dõi */}
      <button
        onClick={handleFollow}
        className={`flex items-center gap-2 px-6 py-2.5  
      shadow-md  transition-all duration-200 text-white rounded-sm cursor-pointer
      ${
        isFollowed
          ? " text-gray-800 bg-black "
          : "bg-black"
      }`}
      >
        <FaBookmark
          className={`text-base ${isFollowed ? "text-red-500" : "text-white"}`}
        />
        <span className="font-medium">
          {isFollowed ? "Đã theo dõi" : "Theo dõi"}
        </span>
      </button>

      {/* Yêu thích */}
      <button
        onClick={handleFavorite}
        className={`flex items-center gap-2 px-6 py-2.5  
      shadow-md  transition-all duration-200 rounded-sm cursor-pointer
      ${
        isFavorite
          ? "bg-pink-500 text-white hover:bg-pink-600"
          : "bg-pink-400 text-white hover:bg-pink-500"
      }`}
      >
        <FaHeart
          className={`text-base transition-transform duration-200 ${
            isFavorite ? "scale-110" : ""
          }`}
        />
        <span className="font-medium">{isFavorite ? "Đã thích" : "Thích"}</span>
      </button>
    </div>
  );
};
