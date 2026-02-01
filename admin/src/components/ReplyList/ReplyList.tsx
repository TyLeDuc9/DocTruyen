import { useState } from "react";
import type { Reply } from "../../types/commentType";

interface Props {
  replies: Reply[];
  replyDeleteComment: (commentId: string, replyId: string) => void;
  commentId: string;
}

export const ReplyList = ({ replies, commentId, replyDeleteComment }: Props) => {
  const STEP = 5;
  const [visibleCount, setVisibleCount] = useState(STEP);
  if (!replies || replies.length === 0) {
    return <span className="text-gray-400 text-xs">No replies</span>;
  }

  const hasMore = visibleCount < replies.length;

  return (
    <div className="space-y-1 text-left">
      <ul className="space-y-1">
        {replies.slice(0, visibleCount).map((r) => (
          <li key={r._id} className="text-xs flex justify-between items-center">
            <div className="">
              <span className="font-semibold">
                {r.userId?.userName || "Unknown"}:
              </span>{" "}
              {r.content}
            </div>

            <button
              onClick={() => replyDeleteComment(commentId, r._id)}
              className="text-red-400 hover:underline cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setVisibleCount((prev) => prev + STEP)}
          className="text-xs cursor-pointer text-blue-500 hover:underline"
        >
          Xem thêm ({replies.length - visibleCount})
        </button>
      )}
    </div>
  );
};
