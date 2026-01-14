import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { getCommentByChapterId } from "../../redux/Comment/commentThunk";
import avatar from "../../assets/logo/avatar.jpg";
import type { GetCommentByChapterParams } from "../../types/commentType";
import { CommentChapterReaction } from "../CommentChapter/CommentChapterReaction";
import { CommentChapterReactionReply } from "../CommentChapter/CommentChapterReactionReply";
import { CommentChapterReplyDelete } from "../CommentChapter/CommentChapterReplyDelete";
import { CommentChapterDelete } from "../CommentChapter/CommentChapterDelete";
interface CommentChapterProps {
  chapterId: string;
}
export const CommentChapterList: React.FC<CommentChapterProps> = ({
  chapterId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openReplies, setOpenReplies] = useState<string[]>([]);

  const { comments, loading, totalComments } = useSelector(
    (state: RootState) => state.comment
  );

  const [filters, setFilters] = useState<GetCommentByChapterParams>({
    chapterId,
    page: Number(searchParams.get("page")) || 1,
    limit: 20,
  });

  useEffect(() => {
    dispatch(getCommentByChapterId(filters));
  }, [filters, dispatch]);

  const toggleReplyHandler = (commentId: string) => {
    setOpenReplies((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const updateURL = (newFilters: GetCommentByChapterParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    setSearchParams(params);
  };

  if (loading) return <p>Đang tải bình luận...</p>;
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="rounded-lg">
          <div className="flex items-start gap-2 pt-4">
            <img
              src={comment.userId.avatarUrl || avatar}
              alt={comment.userId.userName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex gap-2 items-center text-sm">
                <span className="font-semibold">{comment.userId.userName}</span>
                <span className="text-xs">
                  {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                </span>
                 <CommentChapterDelete comment={comment} />
              </div>

              <p className="mt-1 text-gray-700">{comment.content}</p>
              <CommentChapterReaction
                commentId={comment._id}
                comment={comment}
              />

              {comment.replies?.length > 0 && (
                <button
                  onClick={() => toggleReplyHandler(comment._id)}
                  className="flex items-center text-gray-500 gap-1 font-medium cursor-pointer text-sm mt-2"
                >
                  <FaReply />
                  {openReplies.includes(comment._id)
                    ? "Ẩn phản hồi"
                    : `Xem ${comment.replies.length} phản hồi`}
                </button>
              )}
            </div>
          </div>

          {openReplies.includes(comment._id) && (
            <div className="mt-4 ml-12 space-y-3 text-sm">
              {comment.replies.map((reply) => (
                <div key={reply._id} className="flex items-start gap-4 my-4">
                  <img
                    src={reply.userId.avatarUrl || avatar}
                    alt={reply.userId.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex gap-4 items-center">
                      <span className="font-semibold">
                        {reply.userId.userName || "Người dùng"}
                      </span>
                      <CommentChapterReplyDelete comment={comment} reply={reply} />
                    </div>

                    <p className="mt-1 text-gray-700">{reply.content}</p>
                    <CommentChapterReactionReply
                      commentId={comment._id}
                      reply={reply}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <PaginationStory
        currentPage={filters.page || 1}
        pageSize={filters.limit || 20}
        total={totalComments}
        onChange={(page) => {
          const newFilters = { ...filters, page };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
      />
    </div>
  );
};
