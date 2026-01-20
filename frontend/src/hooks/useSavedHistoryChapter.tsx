import { useState, useEffect } from "react";
import {
  saveChapterHistoryApi,
  checkChapterApi,
} from "../services/readingHistory";

export const useSavedHistoryChapter = (
  chapterId?: string,
  storyId?: string,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (!chapterId) return;

    const check = async () => {
      try {
        const res = await checkChapterApi(chapterId);
        setSaved(res.saved);
     
      } catch (err) {
        console.error(err);
      }
    };

    check();
  }, [chapterId]);

  const handleSavedChapterHistory = async () => {
    if (!chapterId || !storyId) return;
    try {
      setLoading(true);
      setError(null);
      await saveChapterHistoryApi({ chapterId, storyId });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };


  return { loading, error, handleSavedChapterHistory, saved };
};
