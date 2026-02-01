import { useAllComment } from "../../hooks/useAllComment";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { ReplyList } from "../../components/ReplyList/ReplyList";
import { FilterFavorite } from "../../components/Filter/FilterFavorite";
import { useParentDeleteComment } from "../../hooks/useParentDeleteComment";
import { useReplyDeleteComment } from "../../hooks/useReplyDeleteComment";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const AllComment = () => {
  const {
    allComment,
    loading,
    error,
    totalComment,
    filters,
    updateFilter,
    handleReset,
  } = useAllComment();
  const { parentDeleteComment, error: parentError } = useParentDeleteComment(
    () => {
      updateFilter({ ...filters });
    },
  );
  const { replyDeleteComment, error: replyError } = useReplyDeleteComment(
    () => {
      updateFilter({ ...filters });
    },
  );
  const thClass =
    "p-3 border border-gray-200 text-center text-sm font-semibold";
  const tdClass = "p-3 border border-gray-200 text-sm";

  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);

  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error || parentError || replyError)
    return (
      <div className="p-4 text-red-500">
        {error || parentError || replyError}
      </div>
    );

  return (
    <div className="space-y-4 p-4">
      {/* HEADER */}
      <FilterFavorite
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
      />
      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Comment List
            </h3>
            <p className="text-sm text-gray-500">
              Total comments:{" "}
              <span className="font-semibold">{totalComment}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-main text-white">
                <tr className="text-center text-sm">
                  <th className={thClass}>STT</th>
                  <th className={thClass}>Email</th>
                  <th className={thClass}>Username</th>
                  <th className={thClass}>Story</th>
                  <th className={thClass}>Chapter/Title</th>
                  <th className={thClass}>Content</th>
                  <th className={thClass}>Replies</th>
                  <th className={thClass}>Created</th>
                  <th className={thClass}>Updated</th>
                  <th className={thClass}>Delete Parent Comment </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allComment.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className={`${tdClass} font-medium text-main`}>
                      {c.userId?.email || "User deleted"}
                    </td>
                    <td className={`${tdClass} font-medium text-main`}>
                      {c.userId?.userName || ""}
                    </td>
                    <td className={tdClass}>{c.storyId?.name}</td>
                    <td className={tdClass}>
                      {c.chapterId?.chapterMain} {c.chapterId?.title}
                    </td>
                    <td className={tdClass}>{c.content}</td>
                    <td className={tdClass}>
                      <ReplyList
                        replies={c.replies}
                        replyDeleteComment={replyDeleteComment}
                        commentId={c._id}
                      />
                    </td>
                    <td className={`${tdClass} text-xs`}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className={`${tdClass} text-xs`}>
                      {new Date(c.updatedAt).toLocaleDateString()}
                    </td>
                    <td className={tdClass}>
                      <button
                        onClick={() => parentDeleteComment(c._id)}
                        className="px-4 py-2 cursor-pointer text-xs bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allComment.length === 0 && (
            <div className="p-6 text-center text-gray-500">Not found</div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalComment}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
    </div>
  );
};
