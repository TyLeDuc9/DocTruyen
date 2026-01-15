import {
  createFavorite,
  deleteFavorite,
} from "../redux/Favorite/favoriteThunk";
import type { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
export const useFavoriteStory = (storyId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const isFavorite = useSelector((state: RootState) =>
    state.favorite.favorites.some(
      (favorite) => favorite.storyId?._id === storyId
    )
  );

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
  return{isFavorite, handleFavorite}
};
