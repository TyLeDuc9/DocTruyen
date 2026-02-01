import { useNavigate } from "react-router-dom";
import avatar from "../../assets/logo/avatar.jpg";
import { useProfile } from "../../hooks/useProfile";
export const Profile = () => {
  const navigate = useNavigate();
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
    <div className="flex-1 flex justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-medium text-center mb-6">
          Profile Information
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            onClick={() => setShowPreview(true)}
            src={formData.preview || avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full cursor-pointer object-cover shadow-md mb-3"
          />

          <label className="cursor-pointer bg-blue-50 text-main px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
            Select new image
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

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
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            User name
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
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-main text-white py-2.5 rounded-lg font-semibold cursor-pointer transition"
        >
          {loading ? "Save change..." : "Saved"}
        </button>
        <button
          onClick={() => navigate("/admin/change-password")}
          className="cursor-pointer w-full my-4 text-red-500 hover:text-red-400"
        >
          Change Password
        </button>
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
