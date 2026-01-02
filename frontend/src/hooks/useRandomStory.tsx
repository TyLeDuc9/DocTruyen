import { useEffect, useState } from "react";
import type { Story } from "../types/storyType";
import { getRandomStory } from "../services/storyApi";
export const useRandomStory = () => {
  const [randomStory, setRandomStory] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomStory = async () => {
      try {
        setLoading(true);
        const res = await getRandomStory();
        setRandomStory(res.story);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchRandomStory()
  }, []);
  return { randomStory, loading, error };
};
