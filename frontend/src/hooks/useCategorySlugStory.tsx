import { useEffect, useState } from "react";
import { getCategorySlugStory } from "../services/storyApi";
import type { Story, GetStoryParams } from "../types/storyType";

interface UseCategorySlugStoryProps {
  slug: string;
  params?: GetStoryParams;
}

export const useCategorySlugStory = ({ slug, params }: UseCategorySlugStoryProps) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalStories, setTotalStories] = useState<number>(0);

  useEffect(() => {
    if (!slug) return;

    const fetchStories = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCategorySlugStory(slug, params);
        setStories(data.story);
        setTotalPages(data.totalPages);
        setTotalStories(data.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [slug, JSON.stringify(params)]);

  return {
    stories,
    loading,
    error,
    totalPages,
    totalStories,
  };
};
