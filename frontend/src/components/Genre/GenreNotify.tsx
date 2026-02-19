import { useLoading } from "../../context/LoadingContext";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useGetNotifyByUser } from "../../hooks/useGetNotifyByUser";
export const GenreNotify = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;

  const { data, loading, error } = useGetNotifyByUser(userId as string);

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
    <div className="w-full px-4 space-y-4 bg-white">
      {data.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          Không có thông báo nào
        </p>
      )}

      {data.map((n) => (
        <div
          key={n._id}
          className="
       relative
      border-b-2 border-gray-200
      transition-all duration-200
      lg:p-3 p-1
    "
        >
          <div className="grid grid-cols-[1fr_64px] gap-4 items-center">
            {/* LEFT CONTENT */}  
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-main lg:text-sm text-xs line-clamp-1">
                {n.title}
              </h3>

              <p className="lg:text-sm text-xs text-gray-600 leading-relaxed line-clamp-2">
                {n.message}
              </p>

              {n.link && (
                <a
                  href={n.link}
                  className="lg:text-sm text-xs font-medium text-main hover:underline w-fit"
                >
                  Xem chi tiết →
                </a>
              )}
            </div>

            {/* RIGHT THUMBNAIL */}
            <div className="flex flex-col items-center gap-1">
              {n.storyId?.thumbnail && (
                <img
                  src={n.storyId.thumbnail}
                  alt={n.storyId.name}
                  className="lg:w-12 lg:h-16 w-8 h-12 object-cover rounded-sm border border-gray-200"
                />
              )}

              {n.chapterId?.images?.[0] && (
                <img
                  src={n.chapterId.images[0]}
                  alt={n.chapterId.title}
                  className="lg:w-12 lg:h-16 w-8 h-12 object-cover rounded-sm border border-gray-200"
                />
              )}

              <span className="text-xs text-center font-medium text-main line-clamp-1">
                {n.storyId?.name || n.chapterId?.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
