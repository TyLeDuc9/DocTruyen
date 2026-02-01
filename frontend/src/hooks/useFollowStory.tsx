import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { createFollow, deleteFollow } from "../redux/Follow/followThunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useFollowButton = (storyId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const isFollowed = useSelector((state: RootState) =>
    state.follow.follows.some((follow) => follow.storyId._id === storyId),
  );
  const handleFollow = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để theo dõi truyện");
      return;
    }

    if (isFollowed) {
      dispatch(deleteFollow(storyId));
    } else {
      dispatch(createFollow({ storyId }));
    }
  };

  return { isFollowed, handleFollow, user };
};
