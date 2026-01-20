import { useState } from "react";
import { saveReadingHistory } from "../services/readingHistory";
import type {
  ReadingHistoryRequest,
} from "../types/readingHistoryType";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const useSavedHistoryStory = () => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
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
    if (!user || !accessToken) return;
    saveHistory({ storyId });
  };

  return { handleSavedHistoryStory, loading, error };
};
