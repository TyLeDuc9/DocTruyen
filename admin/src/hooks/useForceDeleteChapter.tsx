import { useState } from "react";
import { deleteChapterApi } from "../services/chapterApi";

export const useForceDeleteChapter = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forceDeleteChapter = async (id: string) => {
    try {
      setLoading(true);
      await deleteChapterApi(id);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    forceDeleteChapter,
    loading,
    error,
  };
};
