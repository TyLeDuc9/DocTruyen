import { useEffect, useState } from "react";
import type { DashboardOverview } from "../types/dashboardType";
import { getDashboardOverview } from "../services/dashboardApi";

export const useGetDashboardOverview = () => {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardOverview = async () => {
    try {
      setLoading(true);
      const res = await getDashboardOverview(); 
      setData(res.data); 
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardOverview();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardOverview,
  };
};
