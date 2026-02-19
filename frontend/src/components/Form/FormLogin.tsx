import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin } from "../../hooks/useLogin";
import { useTogglePassword } from "../../hooks/useTogglePassword";

type FormLoginProps = {
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export const FormLogin = ({
  onClose,
  onSwitchToRegister,
}: FormLoginProps) => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useLogin(onClose);
  const { showPassword, togglePassword } = useTogglePassword();

  const inputClass =
    "w-full p-2 md:p-3 border rounded my-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 text-sm md:text-base";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white relative rounded-lg w-full max-w-md p-5 md:p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl cursor-pointer text-gray-700 hover:text-gray-400"
        >
          <FiX />
        </button>

        <h2 className="text-lg md:text-xl font-semibold mb-5 text-center">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center my-2 text-sm">{error}</p>
          )}

          {/* Submit */}
          <button className="w-full bg-[#236288] hover:bg-[#1d5373] transition text-white py-2 md:py-3 rounded text-sm md:text-base">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {/* Switch */}
          <p className="text-sm text-center my-4">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:underline"
            >
              Đăng ký
            </button>
          </p>
        </form>

        <button className="text-sm text-blue-600 hover:underline text-center w-full">
          Quên mật khẩu?
        </button>
      </div>
    </div>
  );
};