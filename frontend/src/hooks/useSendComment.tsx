import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useState } from "react";
import { createComment } from "../redux/Comment/commentThunk";
import type { CreateCommentRequest } from "../types/commentType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useSendComment = (storyId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState("");
  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Please login");
    }
    if (!content.trim()) {
      return toast.error("Comment không được để trống");
    }
    const data: CreateCommentRequest = {
      storyId,
      content,
      userId: user._id,
    };
    try {
      await dispatch(createComment(data)).unwrap();
      setContent("");
    } catch (error) {
      toast.error("Gửi bình luận thất bại: " + error);
    }
  };

  return {
    content,
    setContent,
    sendComment,
  };
};
