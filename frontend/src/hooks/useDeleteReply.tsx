import { useDispatch, useSelector } from "react-redux";
import { deleteReply } from "../redux/Comment/commentThunk";
import type { RootState, AppDispatch } from "../redux/store";
export const useDeleteReply = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleDeleteReply = (commentId: string, replyId: string) => {
    if (!user) {
      alert("Please login");
      return;
    }
    dispatch(deleteReply({ commentId, replyId }));
  };
  return { handleDeleteReply, user };
};
