import { getTopMonth } from "../services/storyApi";
import { useEffect, useState } from "react";
import type { Story, GetStoryParams } from "../types/storyType";

const useGetTopMonth = () => {
  const [stories, setStories] = useState<Story[]>([]);
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
    const fetchGetTopMonth = async () => {
      setLoading(true);
      try {
        const res = await getTopMonth(filters);
        setStories(res.story);
        setTotalStories(res.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchGetTopMonth();
  }, [filters]);

  return {
    stories,
    loading,
    error,
    totalStories,
    updateFilter,
    filters,
  };
};


export default useGetTopMonth;
