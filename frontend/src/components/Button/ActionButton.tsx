  import React, { useEffect } from "react";
  import { FaPlay, FaListUl, FaBookmark, FaHeart } from "react-icons/fa";
  import { useDispatch } from "react-redux";
  import { useFollowButton } from "../../hooks/useFollowStory";
  import { useFavoriteStory } from "../../hooks/useFavoriteStory";
  import { getFollowMe } from "../../redux/Follow/followThunk";
  import type { AppDispatch } from "../../redux/store";
  import { getFavoriteMe } from "../../redux/Favorite/favoriteThunk";
  import { useChapterNavigation } from "../../hooks/useChapterNavigation";
  interface ActionButtonProps {
    chapters: { slug: string }[];
    storyId: string;
  }
  export const ActionButton: React.FC<ActionButtonProps> = ({
    chapters,
    storyId,
  }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isFollowed, handleFollow, user } = useFollowButton(storyId);
    const { isFavorite, handleFavorite } = useFavoriteStory(storyId);
    const { handleFirstChapter, handleNewChapter } =
      useChapterNavigation(chapters);
    useEffect(() => {
      if (user) {
        dispatch(getFollowMe());
        dispatch(getFavoriteMe());
      }
    }, [user, dispatch]);

   return (
  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 mt-6 w-full">
    <button
      onClick={handleFirstChapter}
      className="flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-sm cursor-pointer
      bg-blue-500 text-white
      shadow-md hover:bg-blue-600 transition-all duration-200
      w-full sm:w-auto"
    >
      <FaPlay className="text-sm shrink-0" />
      <span className="font-medium whitespace-nowrap">Đọc từ đầu</span>
    </button>

    <button
      onClick={handleNewChapter}
      className="flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-sm cursor-pointer
      bg-green-500 text-white
      shadow-md hover:bg-green-600 transition-all duration-200
      w-full sm:w-auto"
    >
      <FaListUl className="text-sm shrink-0" />
      <span className="font-medium whitespace-nowrap">Đọc mới nhất</span>
    </button>

    <button
      onClick={handleFollow}
      className={`flex items-center justify-center gap-2 px-3 sm:px-8 py-2.5
      shadow-md transition-all duration-200 text-white rounded-sm cursor-pointer
      w-full sm:w-auto
      ${isFollowed ? "text-gray-800 bg-black" : "bg-black"}`}
    >
      <FaBookmark
        className={`text-base shrink-0 ${
          isFollowed ? "text-red-500" : "text-white"
        }`}
      />

      <span className="font-medium whitespace-nowrap">
        {isFollowed ? "Đã theo dõi" : "Theo dõi"}
      </span>
    </button>

    <button
      onClick={handleFavorite}
      className={`flex items-center justify-center gap-2 px-3 sm:px-[52px] py-2.5
      shadow-md transition-all duration-200 rounded-sm cursor-pointer
      w-full sm:w-auto
      ${
        isFavorite
          ? "bg-pink-500 text-white hover:bg-pink-600"
          : "bg-pink-400 text-white hover:bg-pink-500"
      }`}
    >
      <FaHeart
        className={`text-base shrink-0 transition-transform duration-200 ${
          isFavorite ? "scale-110" : ""
        }`}
      />

      <span className="font-medium whitespace-nowrap">
        {isFavorite ? "Đã thích" : "Thích"}
      </span>
    </button>
  </div>
);
  };
