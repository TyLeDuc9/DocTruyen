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
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={handleFirstChapter}
          className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer
        bg-blue-500 text-white  
        shadow-md hover:bg-blue-600  transition-all duration-200"
        >
          <FaPlay className="text-sm" />
          <span className="font-medium">Đọc từ đầu</span>
        </button>

        <button
          onClick={handleNewChapter}
          className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer
        bg-green-500 text-white  
        shadow-md hover:bg-green-600  transition-all duration-200"
        >
          <FaListUl className="text-sm" />
          <span className="font-medium">Đọc mới nhất</span>
        </button>

        <button
          onClick={handleFollow}
          className={`flex items-center gap-2 px-5 py-2.5  
        shadow-md  transition-all duration-200 text-white rounded-sm cursor-pointer
        ${isFollowed ? " text-gray-800 bg-black " : "bg-black"}`}
        >
          <FaBookmark
            className={`text-base ${isFollowed ? "text-red-500" : "text-white"}`}
          />
          <span className="font-medium">
            {isFollowed ? "Đã theo dõi" : "Theo dõi"}
          </span>
        </button>
        <button
          onClick={handleFavorite}
          className={`flex items-center gap-2 px-[52px] py-2.5  
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
