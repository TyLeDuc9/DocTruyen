import { useState } from "react";
import { softDeleteChapterApi } from "../services/chapterApi";
export const useSoftDeleteChapter = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const softDeleteChapter = async (id: string) => {
    try {
      setLoading(true);
      await softDeleteChapterApi(id);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      console.error("Soft delete chapter error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    softDeleteChapter,
    loading,
    error,
  };
};
