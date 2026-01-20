import { getTopWeek } from "../services/storyApi";
import { useEffect, useState } from "react";
import type { Story, GetStoryParams } from "../types/storyType";

export const useGetTopWeek = () => {
  const [storyWeek, setStoryWeek] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStories, setTotalStories] = useState(0);
  const [filters, setFilters] = useState<GetStoryParams>({
    page: 1,
    limit: 36,
  });
  const updateFilter = (newFilter: Partial<GetStoryParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  useEffect(() => {
    const fetchTopWeek = async () => {
      setLoading(true);
      try {
        const res = await getTopWeek(filters);
        setStoryWeek(res.story);
        setTotalStories(res.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchTopWeek()
  }, [filters]);
  
  return {
    storyWeek,
    loading,
    error,
    totalStories,
    updateFilter,
    filters,
  };
};
