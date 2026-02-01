import type { Story, GetStoryParams } from "../types/storyType";
import { getAllStoryAdmin } from "../services/storyApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const useAllStory = () => {
  const [allStory, setAllStory] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStory, setTotalStory] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetStoryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 35,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") as
      | "UPCOMING"
      | "ONGOING"
      | "COMPLETED"
      | "DROPPED",
    categorySlug: searchParams.get("categorySlug") || undefined,
  });
  const [searchText, setSearchText] = useState(filters.search || "");
  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 35,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") as
        | "UPCOMING"
        | "ONGOING"
        | "COMPLETED"
        | "DROPPED",
      categorySlug: searchParams.get("categorySlug") || undefined,
    });
  }, [searchParams]);

  const updateURL = (newFilters: GetStoryParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;
    if (newFilters.search) params.search = newFilters.search;
    if (newFilters.categorySlug) params.categorySlug = newFilters.categorySlug;
    if (newFilters.status) params.status = newFilters.status;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetStoryParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleReset = () => {
    setSearchText("");
    updateFilter({
      page: 1,
      limit: 35,
      sort: undefined,
      categorySlug:undefined,
      search: undefined,
      status:undefined
    });
  };

  const handleSearch = () => {
    updateFilter({ search: searchText.trim() || undefined });
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllStoryAdmin(filters);
        setAllStory(data.data);
        setTotalStory(data.totalStories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [filters]);
  return {
    allStory,
    loading,
    error,
    totalStory,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    setSearchText,
    searchText,
  };
};
