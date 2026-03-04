import { useEffect, useState } from "react";
import { getAllTranslate } from "../services/translateApi";
import type { TranslateAll } from "../types/translateType";

export const useAllTranslate = () => {
  const [allTranslate, setAllTranslate] = useState<TranslateAll[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllTranslate = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllTranslate();
        setAllTranslate(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTranslate();
  }, []);

  return { loading, error, allTranslate };
};