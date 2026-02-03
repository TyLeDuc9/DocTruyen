import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllNotify } from "../services/notifyApi";
import type { GetNotifyParams, Notify } from "../types/notifyType";
export const useAllNotify = () => {
  const [allNotify, setAllNotify] = useState<Notify[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalNotify, setTotalNotify] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetNotifyParams>({
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

  const updateURL = (newFilters: GetNotifyParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetNotifyParams>) => {
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
    const fetchAllNotify = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllNotify(filters);
        setAllNotify(res.data);
        setTotalNotify(res.totalNotifies);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllNotify();
  }, [filters]);
  return {
    allNotify,
    loading,
    error,
    totalNotify,
    filters,
    updateFilter,
    handleReset,
  };
};
