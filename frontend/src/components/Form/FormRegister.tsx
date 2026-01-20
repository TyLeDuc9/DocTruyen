import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { useRegister } from "../../hooks/useRegister";
import {useTogglePassword} from "../../hooks/useTogglePassword";

type FormRegisterProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export const FormRegister = ({
  onClose,
  onSwitchToLogin,
}: FormRegisterProps) => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useRegister(onSwitchToLogin);

  const { showPassword, togglePassword } = useTogglePassword();

  const inputClass =
    "w-full p-2 border rounded my-4 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center z-50 justify-center">
      <div className="bg-white p-6 relative rounded w-96">
        <button
          onClick={onClose}
          className="absolute right-1 top-1 text-xl cursor-pointer text-black hover:text-black/40"
        >
          <FiX />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">Đăng ký</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />

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
              className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center my-2 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#236288] cursor-pointer text-white py-2 rounded"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-sm text-center my-4">
          Đã có tài khoản?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};
