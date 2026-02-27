import { useState, useEffect } from "react";
import {
  saveChapterHistoryApi,
  checkChapterApi,
} from "../services/readingHistory";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useSavedHistoryChapter = (
  chapterId?: string,
  storyId?: string,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!chapterId) return;
    if (!user || !accessToken) return;

    const check = async () => {
      try {
        const res = await checkChapterApi(chapterId);
        setSaved(res.saved);
      } catch (err) {
        console.error(err);
      }
    };

    check();
  }, [chapterId, user, accessToken]);
  const handleSavedChapterHistory = async () => {
    if (!chapterId || !storyId) return;

    if (!user || !accessToken) {
      toast.error("Bạn cần đăng nhập để theo dõi truyện");
      return;
    }
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
