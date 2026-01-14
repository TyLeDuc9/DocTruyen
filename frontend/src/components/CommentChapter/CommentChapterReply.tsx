import { FiX } from "react-icons/fi";
import { useSendReply } from "../../hooks/useSendReply";
interface CommentChapterReplyProps {
  onClose: () => void;
  commentId: string;
}
export const CommentChapterReply: React.FC<CommentChapterReplyProps> = ({
  onClose,
  commentId,
}) => {
  const { content, setContent, sendReply } = useSendReply(commentId, onClose);
  return (
    <div className="mt-2 relative">
      <form action="" onSubmit={sendReply}>
        <button
          onClick={onClose}
          className="absolute top-2 cursor-pointer right-2 text-gray-400 hover:text-gray-600"
        >
          <FiX size={18} />
        </button>

        <textarea
          className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết phản hồi..."
        ></textarea>

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-3 cursor-pointer py-1.5 text-sm text-white bg-main rounded-lg"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};
