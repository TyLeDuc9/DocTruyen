import { FiX } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/Auth/authThunk";
import type { AppDispatch, RootState } from "../../redux/store";
type FormRegisterProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
};
export const FormRegister = ({
  onClose,
  onSwitchToLogin,
}: FormRegisterProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    const result = await dispatch(register(formData));
    if (register.fulfilled.match(result)) {
      setFormData({ email: "", password: "" });
      alert('Regitse successfull')
      onSwitchToLogin();
    }
  };

  const inputClass =
    "w-full p-2 border rounded my-4 boder border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300";
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

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />

          {error && <p className="text-red-500 text-center my-2 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#236288] text-white py-2 rounded"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
        <p className="text-sm text-center my-4">
          Đã có tài khoản?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};
