import { useNavigate } from "react-router-dom";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { FaArrowLeft } from "react-icons/fa";

export const CategoryCreate = () => {
  const { form, handleChange, handleSubmit, loading, error } =
    useCreateCategory();
    const navigate=useNavigate()
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <button onClick={()=>navigate('/admin/category')} className="bg-main text-white text-sm p-2 rounded-sm cursor-pointer flex items-center gap-1">
        <FaArrowLeft />
        Back Category List
      </button>

      <div className="flex-1 flex justify-center">
        <div className="bg-white w-full max-w-md rounded-2xl mt-8 shadow-lg p-8">
          <h2 className="text-xl font-medium text-center mb-6">
            Create Category
          </h2>

          <form onSubmit={handleSubmit} action="">
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
            <button
              type="submit"
              className="w-full bg-main text-white py-2.5 rounded-lg font-semibold cursor-pointer transition"
            >
              Created
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
