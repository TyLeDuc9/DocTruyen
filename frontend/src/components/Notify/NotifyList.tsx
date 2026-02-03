import { useLoading } from "../../context/LoadingContext";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { PaginationStory } from "../PaginationStory/PaginationStory";
import { useGetNotifyByUser } from "../../hooks/useGetNotifyByUser";
export const NotifyList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;

  const { data, totalNotify, loading, error, filters, updateFilter } =
    useGetNotifyByUser(userId as string);

  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);

  if (loading) return <ComponentLoading />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">Lỗi tải thông báo</div>
    );

  return (
    <div className="w-full px-4 space-y-4">
      {data.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          Không có thông báo nào
        </p>
      )}

      {data.map((n) => (
        <div
          key={n._id}
          className="
      relative grid grid-cols-[1fr_96px] gap-4
      p-4 rounded-xl bg-white
      border border-gray-200
      shadow-sm hover:shadow-md
      hover:border-main
      transition-all duration-200
    "
        >
          {/* Left border */}
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-main" />

          {/* Content */}
          <div className="pl-2 flex flex-col justify-between gap-3">
            <div>
              <h3 className="font-semibold text-main text-sm line-clamp-1">
                {n.title}
              </h3>

              <p className="mt-1 text-sm text-gray-600 leading-relaxed line-clamp-2">
                {n.message}
              </p>
            </div>

            {n.link && (
              <a
                href={n.link}
                className="text-sm font-medium text-main hover:underline"
              >
                Xem chi tiết →
              </a>
            )}
          </div>

          {/* Thumbnail */}
          {(n.storyId || n.chapterId) && (
            <div className="flex flex-col items-center gap-2">
              {n.storyId?.thumbnail && (
                <img
                  src={n.storyId.thumbnail}
                  alt={n.storyId.name}
                  className="
              w-20 h-28 object-cover
              rounded-lg border border-gray-200
            "
                />
              )}

              {n.chapterId?.images?.[0] && (
                <img
                  src={n.chapterId.images[0]}
                  alt={n.chapterId.title}
                  className="
              w-20 h-28 object-cover
              rounded-lg border border-gray-200
            "
                />
              )}

              <span className="text-xs text-center font-medium text-main line-clamp-2">
                {n.storyId?.name || n.chapterId?.title}
              </span>
            </div>
          )}
        </div>
      ))}

      <div className="pt-6 flex justify-center">
        <PaginationStory
          currentPage={filters.page || 1}
          pageSize={filters.limit || 20}
          total={totalNotify}
          onChange={(page) => updateFilter({ page })}
        />
      </div>
    </div>
  );
};
