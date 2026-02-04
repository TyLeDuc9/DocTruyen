import { useEffect, useState } from "react";
import { getTopViewedStory } from "../services/dashboardApi";
import type { TopViewedStory } from "../types/dashboardType";

export const useGetTopViewedStory = (limit = 10) => {
  const [data, setData] = useState<TopViewedStory[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    getTopViewedStory(limit)
      .then((res) => {
        if (isMounted) {
          setData(res.data.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Lỗi tải top view");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { data, loading, error };
};
