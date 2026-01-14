import avatar from "../../assets/logo/avatar.jpg";
import { MenuNavbar } from "../../components/Navbar/MenuNavbar";
import { useProfile } from "../../hooks/useProfile";
export const Profile = () => {
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto flex gap-8 px-4">
        <MenuNavbar />
        <div className="flex-1 flex justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-medium text-center mb-6">
              Thông tin tài khoản
            </h2>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <img
                onClick={() => setShowPreview(true)}
                src={formData.preview || avatar}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover shadow-md mb-3"
              />

              <label className="cursor-pointer bg-blue-50 text-main px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
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
                className="w-full bg-gray-100 cursor-not-allowed border border-gray-300 rounded-lg px-3 py-2 text-gray-600"
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
                className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 rounded-lg px-3 py-2"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-main text-white py-2.5 rounded-lg font-semibold cursor-pointer transition "
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <div
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={formData.preview}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
