import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import type { CommentWithUser, Reply } from "../../types/commentType";
import { useDeleteReply } from "../../hooks/useDeleteReply";
interface CommentDeleteReplyProps {
  comment: CommentWithUser;
  reply: Reply;
}
export const CommentReplyDelete: React.FC<CommentDeleteReplyProps> = ({
  comment,
  reply,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { handleDeleteReply, user } = useDeleteReply();
  return (
    <>
      {user && user._id === reply.userId._id && (
        <div className="relative">
          <FiMoreHorizontal
            onClick={() =>
              setOpenMenu((prev) => (prev === reply._id ? null : reply._id))
            }
            className="cursor-pointer text-gray-400"
          />

          {openMenu === reply._id && (
            <button
              onClick={() => handleDeleteReply(comment._id, reply._id)}
              className="text-white text-xs absolute bg-red-500 rounded-sm -right-3 cursor-pointer shadow-2xl px-2 py-1"
            >
              Xoá
            </button>
          )}
        </div>
      )}
    </>
  );
};
