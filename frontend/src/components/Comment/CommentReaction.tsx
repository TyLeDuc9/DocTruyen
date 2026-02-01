import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import type { CommentWithUser } from "../../types/commentType";
import { useReactComment} from "../../hooks/useReactComment";
import { CommentReply } from "./CommentReply";

interface CommentReactionProps {
  commentId: string;
  comment: CommentWithUser;
}
export const CommentReaction: React.FC<CommentReactionProps> = ({
  commentId,
  comment,
}) => {
  const { user, handleReact } = useReactComment(commentId);
  const [openReply, setOpenReply] = useState<string | null>(null);
  const userId = user?._id;
  const isLiked = !!userId && comment.likes.includes(userId);
  const isDisliked = !!userId && comment.dislikes.includes(userId);
  return (
    <>
      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
        <button
          onClick={() => handleReact("like")}
          className={`flex items-center gap-1 py-1 cursor-pointer rounded-full 
            hover:bg-gray-200 transition
            ${isLiked ? "text-blue-400 font-medium" : "text-gray-500"}
          `}
        >
          <FaThumbsUp className={isLiked ? "scale-110" : ""} />
          <span>{comment.likesCount ?? comment.likes.length}</span>
        </button>
        <button
          onClick={() => handleReact("dislike")}
          className={`flex items-center gap-1 cursor-pointer pt-1 rounded-full 
            hover:bg-gray-200 transition
            ${isDisliked ? "text-blue-400 font-medium" : "text-gray-500"}
          `}
        >
          <FaThumbsDown className={isDisliked ? "scale-110" : ""} />
          <span>{comment.dislikesCount ?? comment.dislikes.length}</span>
        </button>
        <button
          onClick={() =>
            setOpenReply(openReply === commentId ? null : commentId)
          }
          className="flex items-center gap-1 pt-1 cursor-pointer  rounded-full hover:bg-gray-200 transition"
        >
          <FaReply /> Reply
        </button>
      </div>
      {openReply === commentId && (
        <CommentReply
          commentId={commentId}
          onClose={() => setOpenReply(null)}
        />
      )}
    </>
  );
};
