import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { reactComment } from "../redux/Comment/commentThunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useReactComment = (commentId:string) => {
    const dispatch=useDispatch<AppDispatch>()
    const {user}=useSelector((state:RootState)=>state.auth)
  const handleReact = (type: "like" | "dislike") => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để phản hồi!");
      return;
    }
    dispatch(reactComment({ commentId, data: { type } }));
  };
  return {handleReact, user}
};
