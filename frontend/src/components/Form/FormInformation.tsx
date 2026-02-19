import avatar from "../../assets/logo/avatar.jpg";
import { useProfile } from "../../hooks/useProfile";

export const FormInformation = () => {
  const {
    userProfile,
    loading,
    formData,
    showPreview,
    setShowPreview,
    setFormData,
    handleFileChange,
    handleSubmit,
  } = useProfile();

  if (!userProfile) return null;

  return (
    <div className="flex-1 flex justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-center mb-6">
          Thông tin tài khoản
        </h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            onClick={() => setShowPreview(true)}
            src={formData.preview || avatar}
            alt="avatar"
            className="
              w-24 h-24 
              sm:w-28 sm:h-28 
              md:w-32 md:h-32 
              rounded-full 
              object-cover 
              shadow-md 
              mb-3 
              cursor-pointer
              hover:scale-105 transition
            "
          />

          <label className="cursor-pointer bg-blue-50 text-main px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 transition">
            Chọn ảnh mới
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={userProfile.email}
            disabled
            readOnly
            className="w-full bg-gray-100 cursor-not-allowed border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600"
          />
        </div>

        {/* Username */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Tên người dùng
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-main/40"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-main text-white py-2.5 rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <div
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <img
            src={formData.preview}
            alt="preview"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};