import { useState } from "react";
import { saveReadingHistory } from "../services/readingHistory";
import type {
  ReadingHistoryRequest,
} from "../types/readingHistoryType";

export const useSavedHistoryStory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveHistory = async (data: ReadingHistoryRequest) => {
    try {
      setLoading(true);
      const res = await saveReadingHistory(data);
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  const handleSavedHistoryStory = (storyId: string) => {
    saveHistory({ storyId });
  };
  return { handleSavedHistoryStory, loading, error};
};
