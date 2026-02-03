import { FilterUser } from "../../components/Filter/FilterUser";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import avatar from "../../assets/logo/avatar.jpg";
import { useState } from "react";
import { useBlockUser } from "../../hooks/useBlockUser";
import { useUnblockUser } from "../../hooks/useUnblockUser";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const AllUser = () => {
  const {
    allUsers,
    loading,
    error,
    totalUsers,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    searchText,
    setSearchText,
  } = useGetAllUsers();
  const { deleteUser, error:deleteErorr } = useDeleteUser(() => updateFilter({ ...filters }));
  const { blockUser, error: blockedError } = useBlockUser(() =>
    updateFilter({ ...filters }),
  );
  const { UnblockUser, error: unblockedError } = useUnblockUser(() =>
    updateFilter({ ...filters }),
  );
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const tdClass = "p-3 border border-gray-200 text-sm";
  const startIndex = ((filters.page || 1) - 1) * (filters.limit || 20);
   const { setComponentsLoading } = useLoading();
   useEffect(() => {
     setComponentsLoading(loading);
   }, [loading]);
   if (loading) return <ComponentLoading />;
  if (error || blockedError || unblockedError || deleteErorr)
    return <div>{error || blockedError || unblockedError || deleteErorr}</div>;

  const thClass = "p-3 border border-white/10";
  const actionBtn = "px-4 py-2 text-xs font-medium rounded transition-colors";
  return (
    <div className="space-y-4 p-4">
      <FilterUser
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
        handleSearch={handleSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">User List</h3>
            <p className="text-sm text-gray-500">
              Total users: <span className="font-semibold">{totalUsers}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-main text-white">
                <tr className="text-center text-sm">
                  <th className={thClass}>STT</th>
                  <th className={thClass}>Username</th>
                  <th className={thClass}>Avatar</th>
                  <th className={thClass}>Email</th>
                  <th className={thClass}>Bloked Status</th>
                  <th className={thClass}>Role</th>
                  <th className={thClass}>Created At</th>
                  <th className={thClass}>Updated At</th>
                  <th className={thClass}>Block</th>
                  <th className={thClass}>Unblock</th>
                  <th className={thClass}>Delete</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {allUsers.map((u, index) => (
                  <tr
                    key={u._id}
                    className="border-t hover:bg-gray-50 transition text-center"
                  >
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium text-main">
                      {u.userName}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <img
                        onClick={() => setPreviewImg(u.avatarUrl || avatar)}
                        className="w-12 cursor-pointer h-12 rounded-full mx-auto object-cover"
                        src={u.avatarUrl || avatar}
                        alt={u.userName}
                      />
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {u.email}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span
                        className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold
                          ${u.isBlocked ? "text-red-700 bg-red-100" : "text-blue-700 bg-blue-100"}
                        `}
                      >
                        {u.isBlocked ? "true" : "false"}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span
                        className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold
                          ${
                            u.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : u.role === "author"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {u.createdAt
                        ? new Date(u.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className={tdClass}>
                      <button
                        onClick={() => blockUser(u._id)}
                        className={`${actionBtn} ${u.isBlocked ? "bg-gray-300 text-gray-500 cursor-not-allowed" : 
                          "bg-orange-500 cursor-pointer hover:bg-orange-600 text-white"} `}
                      >
                        Blocked
                      </button>
                    </td>
                    <td className={tdClass}>
                      <button
                        onClick={() => UnblockUser(u._id)}
                        className={`${actionBtn} ${
                          u.isBlocked
                            ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Unblocked
                      </button>
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className={`${actionBtn} bg-red-500 hover:bg-red-600 cursor-pointer text-white`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allUsers.length === 0 && (
            <div className="p-6 text-center text-gray-500">No users found</div>
          )}
        </div>

        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalUsers}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
      {previewImg && (
        <div
          onClick={() => setPreviewImg(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            onClick={(e) => e.stopPropagation()}
            src={previewImg}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
