import { useState } from "react";
import { restoreStoryApi } from "../services/storyApi";

export const useRestoreStory = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restoreStory = async (id: string) => {
    try {
      setLoading(true);
      const res = await restoreStoryApi(id);
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
    restoreStory,
    loading,
    error,
  };
};
