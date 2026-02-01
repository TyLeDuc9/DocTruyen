import back from "../../assets/background/back.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTogglePassword } from "../../hooks/useTogglePassword";
import { useLogin } from "../../hooks/useLogin";
export const FormLogin = () => {
  const { showPassword, togglePassword } = useTogglePassword();
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();
  const inputClass =
    "w-full px-4 py-2.5 border rounded-xl border-gray-300 bg-white/90 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 " +
    "transition duration-200";

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
      <div className="absolute top-16 z-10 w-full flex justify-center px-4">
        <h1 className="text-white text-center text-2xl md:text-3xl font-semibold drop-shadow-lg max-w-2xl leading-relaxed">
          ✨ Chào mừng bạn đến với hệ thống ✨ <br />
          Hãy đăng nhập để sử dụng đầy đủ tính năng.
        </h1>
      </div>

      <div className="relative z-20 w-full max-w-md mt-16">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-7 border border-white/40">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass + " mt-1"}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass + " pr-12"}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-center my-2 text-sm">{error}</p>
            )}
            {/* button login */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-[#236288] to-[#2f7fb0]
              hover:opacity-95 active:scale-[0.99] transition duration-200 shadow-md"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            {/* signup */}
            {/* <p className="text-sm text-center text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                className="text-blue-500 font-medium hover:underline cursor-pointer"
              >
                Đăng ký
              </button>
            </p> */}
          </form>

          {/* forgot */}
          <button className="text-sm text-blue-600 hover:underline text-center w-full cursor-pointer mt-4">
            Quên mật khẩu?
          </button>
        </div>
      </div>
    </div>
  );
};
