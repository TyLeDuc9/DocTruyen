import { useState } from "react";
import { deleteReplyCommentApi } from "../services/commentApi";
export const useReplyDeleteComment = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const replyDeleteComment = async (commentId: string, replyId: string) => {
    try {
      setLoading(true);
      await deleteReplyCommentApi(commentId, replyId);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  return {
    replyDeleteComment,
    loading,
    error,
  };
};
