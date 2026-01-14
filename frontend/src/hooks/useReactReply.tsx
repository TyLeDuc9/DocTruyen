import { reactReply } from "../redux/Comment/commentThunk";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

export const useReactReply = (commentId: string, replyId: string) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleReact = (type: "like" | "dislike") => {
    if (!user) {
      alert("Bạn cần đăng nhập để phản hồi!");
      return;
    }

    dispatch(
      reactReply({
        commentId,
        replyId,          
        data: { type },
      })
    );
  };

  return { user, handleReact };  
};
