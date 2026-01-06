import { useEffect, useState } from "react";
import { getChaptersByStorySlug } from "../services/chapterApi";
import type { Chapter } from "../types/chapterType";

export const useChapterStorySlug = (storySlug: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [story, setStory] = useState<{
    _id: string;
    name: string;
    slug: string;
  } | null>(null);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storySlug) return;

    const fetchChapters = async () => {
      try {
        setLoading(true);
        const data = await getChaptersByStorySlug(storySlug);

        setChapters(data.data);
        setStory(data.story);
        setTotal(data.total);
      }catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [storySlug]);

  return {
    chapters,
    story,
    total,
    loading,
    error,
  };
};
