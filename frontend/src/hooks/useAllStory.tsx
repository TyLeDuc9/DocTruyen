import { useEffect, useState } from "react";
import { getAllStory } from "../services/storyApi";
import type { Story, GetStoryParams } from "../types/storyType";

interface UseAllStoyProps {
  params?: GetStoryParams;
}

export const useAllStory = ({ params }: UseAllStoyProps) => {
  const [allStory, setAllStory] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalStories, setTotalStories] = useState<number>(0);

  useEffect(() => {
    const fetchAllStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllStory(params);
        setAllStory(data.story);
        setTotalPages(data.totalPages);
        setTotalStories(data.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllStory();
  }, [params]);

  return {
    allStory,
    loading,
    error,
    totalPages,
    totalStories,
  };
};
