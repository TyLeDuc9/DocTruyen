import  { useEffect, useState } from "react";
import { getTopDay } from "../services/storyApi";
import type { Story, GetStoryParams } from "../types/storyType";

export const useGetTopDay = () => {
  const [storyDay, setStoryDay] = useState<Story[]>([]);
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
    const fetchGetTopDay = async () => {
      setLoading(true);
      try {
        const res = await getTopDay();
        setStoryDay(res.story);
        setTotalStories(res.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchGetTopDay();
  }, [filters]);

  return {
    storyDay,
    loading,
    error,
    totalStories,
    updateFilter,
    filters,
  };
};
