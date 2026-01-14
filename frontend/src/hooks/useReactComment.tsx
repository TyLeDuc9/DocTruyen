import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { reactComment } from "../redux/Comment/commentThunk";
export const useReactComment = (commentId:string) => {
    const dispatch=useDispatch<AppDispatch>()
    const {user}=useSelector((state:RootState)=>state.auth)
  const handleReact = (type: "like" | "dislike") => {
    if (!user) {
      alert("Bạn cần đăng nhập để phản hồi!");
      return;
    }
    dispatch(reactComment({ commentId, data: { type } }));
  };
  return {handleReact, user}
};
