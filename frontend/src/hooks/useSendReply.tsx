import React, { useState } from "react";
import { createReply } from "../redux/Comment/commentThunk";
import { useDispatch, useSelector } from "react-redux";

import type { CreateReplyRequest } from "../types/commentType";
import type { RootState, AppDispatch } from "../redux/store";
export const useSendReply = (commentId: string, onClose: () => void) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login");
      return;
    }
    if (!content.trim()) {
      alert("Comment không được để trống");
      return;
    }
    const data: CreateReplyRequest = {
      commentId,
      content,
    };
    try {
      await dispatch(createReply(data));
      setContent("");
      onClose();
    } catch (error) {
      alert("Gửi bình luận thất bại: " + error);
    }
  };
  return { content, setContent, sendReply };
};
