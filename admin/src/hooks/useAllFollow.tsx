import type { FollowParams, Follow } from "../types/followType";
import { getAllFollowApi } from "../services/followType";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const useAllFollow = () => {
  const [allFollow, setAllFollow] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalFollow, setTotalFollow] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FollowParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
  });

  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    });
  }, [searchParams]);

  const updateURL = (newFilters: FollowParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<FollowParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleReset = () => {
    updateFilter({
      page: 1,
      limit: 20,
      sort: undefined,
    });
  };


  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllFollowApi(filters);
        setAllFollow(data.data);
        setTotalFollow(data.totalFavorites);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [filters]);
  return {
    allFollow,
    loading,
    error,
    totalFollow,
    filters,
    updateFilter,
    handleReset,
  };
};
