import { useNavigate } from "react-router-dom";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";
import { FaArrowLeft } from "react-icons/fa";

export const CategoryUpdate = () => {
  const navigate = useNavigate();

  const { form, loading, error, handleChange, handleSubmit } =
    useUpdateCategory();

  return (
    <>
      <button
        onClick={() => navigate("/admin/category")}
        className="bg-main text-white p-2 rounded-sm flex items-center gap-1"
      >
        <FaArrowLeft />
        Back Category List
      </button>

      <div className="flex justify-center">
        <div className="bg-white w-full max-w-md mt-8 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-medium text-center mb-6">
            Update Category
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Content
              </label>
              <input
                name="content"
                value={form.content}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
              />
            </div>

            {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

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
