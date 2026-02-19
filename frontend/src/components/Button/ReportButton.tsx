import { FaBug } from "react-icons/fa";
import { useCreateChapterReport } from "../../hooks/useCreateChapterReport";

type ReportButtonProps = {
  chapterId: string;
};

export const ReportButton: React.FC<ReportButtonProps> = ({ chapterId }) => {
  const {
    showForm,
    reason,
    loading,
    error,
    toggleForm,
    closeForm,
    setReason,
    submitReport,
  } = useCreateChapterReport(chapterId);

  return (
    <div className="flex flex-col items-center mt-4 gap-3">
      <button
        onClick={toggleForm}
        className="bg-red-500 lg:px-4  cursor-pointer px-2 py-2 text-white rounded-sm flex gap-2"
      >
        <FaBug />
        Báo lỗi chương
      </button>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitReport();
          }}
          className="w-full max-w-md bg-white p-5 rounded-xl shadow-lg  border border-gray-300"
        >
          <textarea
            value={reason}
            disabled={loading}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập nội dung lỗi"
            rows={4}
            required
            className=" w-full p-3 text-base rounded-lg resize-none border border-gray-300 placeholder-gray-400 bg-white focus:outline-none
    focus:ring-0 focus:border-red-400 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed "
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-1.5 text-sm text-gray-600 cursor-pointer hover:bg-gray-100"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md
                         hover:bg-red-400 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Đang gửi..." : "Gửi báo lỗi"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
