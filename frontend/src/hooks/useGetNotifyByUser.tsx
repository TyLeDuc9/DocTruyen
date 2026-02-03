import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNotificationsByUser } from "../services/notifyApi";
import type { Notify, GetNotifyParams } from "../types/notifyType";

export const useGetNotifyByUser = (userId: string) => {
  const [data, setData] = useState<Notify[]>([]);
  const [totalNotify, setTotalNotify] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<GetNotifyParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: 20,
  });

  // Sync URL → state
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: Number(searchParams.get("page")) || 1,
    }));
  }, [searchParams]);

  const updateURL = (newFilters: GetNotifyParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetNotifyParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  useEffect(() => {
    if (!userId) return;

    const fetchNotify = async () => {
      try {
        setLoading(true);
        const res = await getNotificationsByUser(
          userId,
          filters.page,
          filters.limit
        );

        setData(res.data);
        setTotalNotify(res.totalNotify);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchNotify();
  }, [userId, filters.page, filters.limit]);

  return {
    data,
    totalNotify,
    loading,
    error,
    filters,
    updateFilter,
  };
};
