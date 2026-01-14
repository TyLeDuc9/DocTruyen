import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState} from "../../redux/store";
import type {CommentWithUser} from '../../types/commentType'
import {useDeleteComment} from '../../hooks/useDeleteComment'
interface CommentChapterDeleteProps{
    comment:CommentWithUser
}

export const CommentChapterDelete:React.FC<CommentChapterDeleteProps> = ({comment}) => {
  
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const {handleDeleteComment}=useDeleteComment()

  const { user } = useSelector((state: RootState) => state.auth);
 
  return (
    <>
      {user && user._id === comment.userId._id && (
        <div className="relative">
          <FiMoreHorizontal
            className="cursor-pointer text-gray-400"
            onClick={() =>
              setOpenMenu((prev) => (prev === comment._id ? null : comment._id))
            }
          />
          {openMenu === comment._id && (
            <button
              onClick={() => handleDeleteComment(comment._id)}
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
