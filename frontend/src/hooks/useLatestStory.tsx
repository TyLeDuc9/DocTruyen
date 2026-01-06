import { useEffect, useState } from "react";
import type { Story } from "../types/storyType";
import { getLatestStory } from "../services/storyApi";
export const useLatestStory = () => {
  const [latestStory, setLatestStoryy] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestStory = async () => {
      try {
        setLoading(true);
        const res = await getLatestStory();
        setLatestStoryy(res.story);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestStory()
  }, []);
  return {latestStory, loading, error}
};
