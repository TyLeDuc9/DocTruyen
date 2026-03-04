import { useAllTranslate } from "../../hooks/useAllTranslate";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import type { TranslateStatus } from "../../types/translateType";
import { useDeleteTranslate } from "../../hooks/useDeleteTranslate";
export const AllTranslate = () => {
  const { loading, error, allTranslate } = useAllTranslate();
  const {
  
    error: translateError,
    deleteTranslate,
  } = useDeleteTranslate();
  const tdClass = "p-3 border border-gray-200 text-sm";
  const thClass = "p-3 border border-white/10";
  const actionBtn = "px-4 py-2 text-xs font-medium rounded transition-colors";
  const statusClass: Record<TranslateStatus, string> = {
    pending: "bg-yellow-400 text-yellow-700",
    confirm: "bg-green-400 text-green-700",
    rejected: "bg-red-400 text-red-700",
  };
  if (loading ) return <ComponentLoading />;
  if (error || translateError) {
    return <div>{error || translateError}</div>;
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-main text-white">
            <tr className="text-center text-sm">
              <th className={thClass}>STT</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>UserName</th>
              <th className={thClass}>Content</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Created At</th>
              <th className={thClass}>Updated At</th>
              {/* <th className={thClass}>Edit</th> */}
              <th className={thClass}>Delete</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {allTranslate.map((c, index) => (
              <tr
                key={c._id}
                className="border-t hover:bg-gray-50 transition text-center"
              >
                <td className={tdClass}>{index + 1}</td>
                <td className="p-3 border border-gray-200 font-medium text-main">
                  {c.userId?.email || "khong co"}
                </td>
                <td className={tdClass}>{c.userId?.userName || "Not found"}</td>
                <td className={tdClass}>{c.content}</td>
                <td className={tdClass}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold${statusClass[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className={tdClass}>
                  {c.updatedAt
                    ? new Date(c.updatedAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className={tdClass}>
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                {/* <td className={tdClass}>
                  <button
                    className={`${actionBtn} bg-blue-500 hover:bg-blue-600 cursor-pointer text-white`}
                  >
                    Edit
                  </button>
                </td> */}
                <td className={tdClass}>
                  <button
                    onClick={() => deleteTranslate(c._id)}
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
    </div>
  );
};
