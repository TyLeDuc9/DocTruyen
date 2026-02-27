
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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

  const updateFilter = (data: Partial<GetStoryParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);

    const params: Record<string, string> = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined) params[key] = String(value);
    });

    setSearchParams(params);
  };

  return { filters, updateFilter, navigate };
};