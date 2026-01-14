import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useState } from "react";
import { createComment } from "../redux/Comment/commentThunk";
import type { CreateCommentRequest } from "../types/commentType";

export const useSendCommentChapter = (chapterId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState("");
  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim())
      return alert(!user ? "Please login" : "Comment không được để trống");
    const data: CreateCommentRequest = {
      chapterId,
      content,
      userId: user?._id,
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
