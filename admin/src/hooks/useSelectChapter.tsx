import { useEffect, useState } from "react";
import { getSelectChapter } from "../services/chapterApi";
import type { Chapter } from "../types/chapterType";

export const useSelectChapter = () => {
  const [selectChapter, setSelectChapter] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectChapter = async () => {
      try {
        setLoading(true);
        const res = await getSelectChapter();
        setSelectChapter(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchSelectChapter();
  }, []);

  return {
    selectChapter,
    loading,
    error,
  };
};
