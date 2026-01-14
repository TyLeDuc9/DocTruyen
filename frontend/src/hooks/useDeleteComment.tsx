import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { deleteComment } from "../redux/Comment/commentThunk"
export const useDeleteComment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleDeleteComment = (commentId: string) => {
    if (!user) {
      alert("Please login");
      return;
    }
    dispatch(deleteComment({ commentId }));
  };
  return{handleDeleteComment, user}
};
