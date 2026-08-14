import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin } from "../../hooks/useLogin";
import { useTogglePassword } from "../../hooks/useTogglePassword";
import login from "../../assets/background/login.jpg";

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
    "w-full p-3 border rounded my-3 border-white/30 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-blue-300";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Card */}
      <div
        className="relative rounded-xl w-full max-w-md shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${login})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative z-10 p-6 text-white">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-xl text-white hover:text-gray-300"
          >
            <FiX />
          </button>

          <h2 className="text-xl font-semibold mb-5 text-center">
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
                className={inputClass + " pr-10"}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-center my-2 text-sm">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#236288] cursor-pointer hover:bg-[#1d5373] transition text-white py-3 rounded mt-2 disabled:opacity-60"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            {/* Switch */}
            <p className="text-sm text-center mt-4">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-blue-300 cursor-pointer hover:underline"
              >
                Đăng ký
              </button>
            </p>
          </form>

          {/* Forgot password */}
          {/* <button className="text-sm text-blue-300 hover:underline text-center w-full mt-2">
            Quên mật khẩu?
          </button> */}
        </div>
      </div>
    </div>
  );
};