import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import type { Reply} from "../../types/commentType";
import { useReactReply } from "../../hooks/useReactReply";
interface CommentChapterReplyProps{
     commentId:string
     reply:Reply
}

export const CommentChapterReactionReply: React.FC<CommentChapterReplyProps> = ({ commentId, reply }) => {
 const {user, handleReact}=useReactReply(commentId, reply._id)
  const userId = user?._id;

  const isLiked = !!userId && reply.likes.includes(userId);
  const isDisliked = !!userId && reply.dislikes.includes(userId);



  return (
    <div className="flex items-center gap-2 mt-1 text-sm">
      <button
        onClick={() => handleReact("like")}
        className={`flex items-center gap-1 cursor-pointer ${isLiked ? "text-blue-400 font-medium" : "text-gray-500"}`}
      >
        <FaThumbsUp /> {reply.likesCount ?? reply.likes.length}
      </button>

      <button
        onClick={() => handleReact("dislike")}
        className={`flex items-center gap-1 pt-1 cursor-pointer ${isDisliked ? "text-blue-400 font-medium" : "text-gray-500"}`}
      >
        <FaThumbsDown /> {reply.dislikesCount ?? reply.dislikes.length}
      </button>
    </div>
  );
};
