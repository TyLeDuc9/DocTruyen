import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAllStory } from "./useAllStory";
import type { GetStoryParams, StoryStatus } from "../types/storyType";

export const useStoryFilters = () => {
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

  const storyData = useAllStory({ params: filters });

  return {
    ...storyData,
    filters,
    updateFilter,
    navigate,
  };
};
