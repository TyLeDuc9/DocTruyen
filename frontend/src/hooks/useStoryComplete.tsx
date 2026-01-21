import { useEffect, useState } from "react";
import type { Story, GetStoryParams } from "../types/storyType";
import { getStoryComplete } from "../services/storyApi";
export const useStoryComplete = () => {
  const [storyComplete, setStoryComplete] = useState<Story[]>([]);
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
    const fetchStoryComplete = async () => {
      setLoading(true);
      try {
        const res = await getStoryComplete(filters);
        setStoryComplete(res.story);
        setTotalStories(res.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchStoryComplete();
  }, [filters]);
  return {
    storyComplete,
    loading,
    error,
    totalStories,
    updateFilter,
    filters,
  };
};

