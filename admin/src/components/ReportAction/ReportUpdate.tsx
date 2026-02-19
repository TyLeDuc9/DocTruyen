import { useNavigate } from "react-router-dom";
import { useUpdateChapterReport } from "../../hooks/useUpdateChapterReport";
import { FaArrowLeft } from "react-icons/fa";
import type { ChapterReportStatus } from "../../types/chapterReportType";
export const ReportUpdate = () => {
  const navigate = useNavigate();
  const {
    status,
    setStatus,
    handleSubmit,
    loading,
    error,
  } = useUpdateChapterReport();

  return (
    <>
      <button
        onClick={() => navigate("/admin/chapter-report")}
        className="bg-main text-white p-2 rounded-sm flex items-center gap-1"
      >
        <FaArrowLeft />
        Back Chapter Report List
      </button>

      <div className="flex justify-center">
        <div className="bg-white w-full max-w-md mt-8 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-medium text-center mb-6">
            Update Status
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as ChapterReportStatus)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="PENDING">PENDING</option>
                <option value="FIXED">FIXED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm mb-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-main text-white py-2.5 rounded-lg font-semibold"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};