import {
  createFavorite,
  deleteFavorite,
} from "../redux/Favorite/favoriteThunk";
import type { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useFavoriteStory = (storyId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const isFavorite = useSelector((state: RootState) =>
    state.favorite.favorites.some(
      (favorite) => favorite.storyId?._id === storyId,
    ),
  );

  const handleFavorite = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để thích truyện");
      return;
    }
    if (isFavorite) {
      dispatch(deleteFavorite(storyId));
    } else {
      dispatch(createFavorite({ storyId }));
    }
  };
  return { isFavorite, handleFavorite };
};
