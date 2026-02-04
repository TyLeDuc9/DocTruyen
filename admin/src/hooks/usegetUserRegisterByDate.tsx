import { useEffect, useState } from "react";
import { getUserRegisterByDate } from "../services/dashboardApi";
import type { UserRegisterByDate } from "../types/dashboardType";

export const useGetUserRegisterByDate = (days = 7) => {
  const [data, setData] = useState<UserRegisterByDate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getUserRegisterByDate(days);
        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [days]);

  return { data, loading, error };
};
