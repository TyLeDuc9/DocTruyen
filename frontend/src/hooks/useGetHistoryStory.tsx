import { useEffect, useState } from "react";
import { getReadingHistory } from "../services/readingHistory";
import type { ReadingHistoryData } from "../types/readingHistoryType";

export const useGetHistoryStory = () => {
  const [historyStory, setHistoryStory] = useState<ReadingHistoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getReadingHistory();
        setHistoryStory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { historyStory, loading, error };
};
