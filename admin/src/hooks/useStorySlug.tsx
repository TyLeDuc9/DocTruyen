import { useEffect, useState } from "react";
import { getStorySlug } from "../services/storyApi";
import type { Story } from "../types/storyType";

export const useStorySlug = (slug?: string) => {
  const [storySlug, setStorySlug] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchStorySlug = async () => {
      setLoading(true);
      try {
        const res = await getStorySlug(slug);
        setStorySlug(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchStorySlug();
  }, [slug]);

  return {
    storySlug,
    loading,
    error,
  };
};
