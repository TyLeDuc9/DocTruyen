import { FiX } from "react-icons/fi";
import { useLogin } from "../../hooks/useLogin";

type FormLoginProps = {
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export const FormLogin = ({ onClose, onSwitchToRegister }: FormLoginProps) => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useLogin(onClose);

  const btnClass =
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

        <h2 className="text-xl font-semibold mb-6 text-center">Đăng nhập</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={btnClass}
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className={btnClass}
          />

          {error && (
            <p className="text-red-500 text-center my-2 text-sm">{error}</p>
          )}

          <button className="w-full bg-[#236288] text-white py-2 rounded">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

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

        <button className="text-sm text-blue-600 hover:underline text-center w-full cursor-pointer">
          Quên mật khẩu?
        </button>
      </div>
    </div>
  );
};
