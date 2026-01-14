import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { getCommentByStoryId } from "../redux/Comment/commentThunk";
import type { GetCommentParams } from "../types/commentType";

export const useCommentList = (storyId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openReplies, setOpenReplies] = useState<string[]>([]);

  const { comments, loading, totalComments } = useSelector(
    (state: RootState) => state.comment
  );

  const [filters, setFilters] = useState<GetCommentParams>({
    storyId,
    page: Number(searchParams.get("page")) || 1,
    limit: 20,
  });

  useEffect(() => {
    dispatch(getCommentByStoryId(filters));
  }, [filters, dispatch]);

  const toggleReplyHandler = (commentId: string) => {
    setOpenReplies((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const updateURL = (newFilters: GetCommentParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    setSearchParams(params);
  };

  return {
    comments,
    loading,
    totalComments,
    filters,
    setFilters,
    openReplies,
    toggleReplyHandler,
    updateURL,
  };
};
