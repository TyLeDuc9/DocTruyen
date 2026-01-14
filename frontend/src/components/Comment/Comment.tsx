import { FaCommentDots } from "react-icons/fa";
import {useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useUpdateUserName } from "../../hooks/useUpdateUserName";
import { useSendComment } from "../../hooks/useSendComment";
interface CommentProps {
  storyId: string;
}

export const Comment: React.FC<CommentProps> = ({ storyId }) => {

  const { user } = useSelector((state: RootState) => state.auth);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { content, setContent, sendComment } = useSendComment(storyId);
  const { displayName, setDisplayName, savedUserName } = useUpdateUserName();

  return (
    <div>
      <h2 className="flex items-center my-6 gap-2 text-lg font-semibold text-main">
        <FaCommentDots />
        Bình luận
      </h2>
      {user && !userProfile?.userName && (
        <form onSubmit={savedUserName} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nhập tên hiển thị của bạn"
            className="p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button
            type="submit"
            className="self-end px-3 cursor-pointer py-1.5 text-sm text-white bg-main rounded-lg"
          >
            Lưu tên
          </button>
        </form>
      )}
      {(!user || userProfile?.userName) && (
        <form onSubmit={sendComment} className="flex flex-col gap-2">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            rows={4}
            placeholder="Viết bình luận..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {user && userProfile?.userName && (
            <p className="text-sm text-gray-500">
              Đang bình luận với tên: <b>{userProfile.userName}</b>
            </p>
          )}
          <button
            type="submit"
            className="self-end px-3 cursor-pointer py-1.5 text-sm text-white bg-main rounded-lg"
          >
            Gửi
          </button>
        </form>
      )}
    </div>
  );
};
