import { useState } from "react";
import { restoreChapterApi } from "../services/chapterApi";

export const useRestoreChapter = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restoreChapter = async (id: string) => {
    try {
      setLoading(true);
      const res = await restoreChapterApi(id);
      onSuccess?.(); 
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    restoreChapter,
    loading,
    error,
  };
};
