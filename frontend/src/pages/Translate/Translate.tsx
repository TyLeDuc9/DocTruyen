import { useCreateTranslate } from "../../hooks/useCreateTranslate";
export const Translate = () => {
  const { content, setContent, handleSubmit, loading, error } =
    useCreateTranslate();
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="">
      <div className="bg-white w-full max-w-md  rounded-2xl mt-8 shadow-lg p-8">
        <h1 className="text-xl font-bold mb-6 text-center text-main">
          Nhập truyện mà bạn muốn dịch
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Tên truyện
            </label>
            <input
              onChange={(e) => setContent(e.target.value)}
              value={content}
              name="content"
              type="text"
              className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main text-white py-2.5 rounded-lg font-semibold cursor-pointer transition"
          >
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
        </form>
      </div>
    </div>
  );
};
