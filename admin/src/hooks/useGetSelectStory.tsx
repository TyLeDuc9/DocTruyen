import { useEffect, useState } from "react";
import { getSelectStory } from "../services/storyApi";

interface SelectStory {
  _id: string;
  name: string;
}

export const useGetSelectStory = () => {
  const [selectStory, setSelectStory] = useState<SelectStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectStory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getSelectStory();
        setSelectStory(res.data); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchSelectStory();
  }, []);

  return {
    selectStory,
    loading,
    error,
  };
};
