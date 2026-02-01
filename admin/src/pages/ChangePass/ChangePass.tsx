import { useChangePass } from "../../hooks/useChangePass";
export const ChangePass = () => {
  const { handleChange, handleSubmit, form, loading, error } = useChangePass();
  return (
    <div className="flex-1 flex justify-center mt-12">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-medium text-center mb-6">Đổi mật khẩu</h2>
        <div>
          <label className="block text-sm text-white mb-1">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu cũ"
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu mới"
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
          />
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mt-3 text-sm">
            {error}
          </div>
        )}
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-main text-white py-2.5 rounded-lg font-semibold cursor-pointer mt-4 transition"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </div>
    </div>
  );
};
