import { useEffect, useState } from "react";
import { getChapterHistoryApi } from "../services/readingHistory";
import type {
  GetChapterParams,
  ChapterHistoryItem,
} from "../types/readingHistoryType";

export const useGetHistoryChapter = () => {
  const [historyChapter, setHistoryChapter] = useState<ChapterHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalChapters, setTotalChapters] = useState<number>(0);

  const [filters, setFilters] = useState<GetChapterParams>({
    page: 1,
    limit: 20,
    sort: "newest",
  });

  const updateFilter = (newFilter: Partial<GetChapterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getChapterHistoryApi(filters);
        setHistoryChapter(res.data);
        setTotalPages(res.totalPages);
        setTotalChapters(res.totalChapters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [filters]);

  return {
    historyChapter,
    loading,
    error,
    totalPages,
    totalChapters,
    filters,
    updateFilter,
  };
};

