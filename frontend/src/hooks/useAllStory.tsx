

import { useEffect, useState } from "react";
import { getAllStory } from "../services/storyApi";
import type { Story, GetStoryParams } from "../types/storyType";

export const useAllStory = (filters: GetStoryParams) => {
  const [allStory, setAllStory] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStories, setTotalStories] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const data = await getAllStory(filters);
        setAllStory(data.story);
        setTotalStories(data.totalStories);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [filters]);

  return { allStory, totalStories, totalPages, loading, error };
};
