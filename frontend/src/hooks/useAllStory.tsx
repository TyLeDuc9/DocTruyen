import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllStory } from "../services/storyApi";
import type { Story, GetStoryParams, StoryStatus } from "../types/storyType";

export const useAllStory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<GetStoryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: 36,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    status: searchParams.get("status") as StoryStatus | undefined,
    country: searchParams.get("country") || undefined,
    keyword: searchParams.get("keyword") || undefined,
  });

  const [allStory, setAllStory] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStories, setTotalStories] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: 36,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
      status: searchParams.get("status") as StoryStatus | undefined,
      country: searchParams.get("country") || undefined,
      keyword: searchParams.get("keyword") || undefined,
    });
  }, [searchParams]);

  const updateURL = (newFilters: GetStoryParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.sort) params.sort = newFilters.sort;
    if (newFilters.status) params.status = newFilters.status;
    if (newFilters.country) params.country = newFilters.country;
    if (newFilters.keyword) params.keyword = newFilters.keyword;
    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetStoryParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  useEffect(() => {
    const fetchAllStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllStory(filters);
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
  }, [filters]);

  return {
    allStory,
    totalStories,
    totalPages,
    loading,
    error,
    filters,
    updateFilter,
    navigate,
  };
};
