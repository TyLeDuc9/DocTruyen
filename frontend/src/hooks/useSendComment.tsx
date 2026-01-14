import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useState } from "react";
import { createComment } from "../redux/Comment/commentThunk";
import type { CreateCommentRequest } from "../types/commentType";

export const useSendComment = (storyId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState("");
  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return alert("Please login");
    }
    if (!content.trim()) {
      return alert("Comment không được để trống");
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
      alert("Gửi bình luận thất bại: " + error);
    }
  };

  return {
    content,
    setContent,
    sendComment,
  };
};
