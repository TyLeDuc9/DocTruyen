import { useState } from "react";
import { deleteParentCommentApi } from "../services/commentApi";

export const useParentDeleteComment = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const parentDeleteComment = async (id: string) => {
    try {
      setLoading(true);
      await deleteParentCommentApi(id);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  return {
    parentDeleteComment,
    loading,
    error,
  };
};
