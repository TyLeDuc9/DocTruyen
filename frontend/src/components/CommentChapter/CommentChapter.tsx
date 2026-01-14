import { FaCommentDots } from "react-icons/fa";
import { useSendCommentChapter } from "../../hooks/useSendCommentChapter";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useUpdateUserName } from "../../hooks/useUpdateUserName";
interface CommentChapterProps {
  chapterId: string;
}
export const CommentChapter: React.FC<CommentChapterProps> = ({
  chapterId,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { content, setContent, sendComment } = useSendCommentChapter(chapterId);
  const { displayName, setDisplayName, savedUserName } = useUpdateUserName();

  return (
    <div className="border-t-2 border-gray-400 mt-8">
      <h2 className="flex items-center my-3 gap-2 text-lg font-semibold text-main">
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
      {(!user || (userProfile?.userName && user)) && (
         <form onSubmit={sendComment} className="flex flex-col gap-2">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            rows={6}
            placeholder="Viết bình luận..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

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
