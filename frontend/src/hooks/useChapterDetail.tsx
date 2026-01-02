import { useEffect, useState } from "react";
import { getDetailChapter } from "../services/chapterApi";
import type { Chapter } from "../types/chapterType";

export const useChapterDetail = (chapterSlug?: string) => {
  const [chapterDetail, setChapterDetail] = useState<Chapter | null>(null);
  const [story, setStory] = useState<{
    _id: string;
    name: string;
    slug: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chapterSlug) return;

    const fetchChapterDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getDetailChapter(chapterSlug);

        setChapterDetail(data.data);
        setStory(data.story);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetail();
  }, [chapterSlug]);

  return {
    chapterDetail,
    story,
    loading,
    error,
  };
};
