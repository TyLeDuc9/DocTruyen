import logo from "../../assets/logo/logo.png";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { BsLightbulb } from "react-icons/bs";
import { FiBell, FiUser } from "react-icons/fi";
import { useState } from "react";
import { FormRegister } from "../Form/FormRegister";
import { FormLogin } from "../Form/FormLogin";
import { UserNavbar } from "../Navbar/UserNavbar";

export const TopHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [openNavbar, setOpenNavbar] = useState(false);

  type AuthFormType = "login" | "register" | null;
  const buttonClass =
    "p-3 rounded-full border border-[#236288] text-[#236288] hover:bg-[#236288] hover:text-white transition cursor-pointer";
  const btnFormClass =
    "bg-[#236288] hover:bg-[#236288]/80 text-white py-2 px-3 rounded-sm  cursor-pointer";
  const [activeForm, setActiveForm] = useState<AuthFormType>(null);
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="logo"
          className="w-20 h-24 rounded-sm object-contain"
        />

        <button className={buttonClass}>
          <BsLightbulb size={20} />
        </button>

        <div className="relative w-96">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none"
          />
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#236288] cursor-pointer"
            size={18}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <button
              onClick={() => setActiveForm("register")}
              className={`${btnFormClass}`}
            >
              Đăng ký
            </button>
            <button
              onClick={() => setActiveForm("login")}
              className={`${btnFormClass}`}
            >
              Đăng nhập
            </button>
          </>
        ) : (
          <>
            <button className={buttonClass}>
              <FiBell size={20} />
            </button>
            <div className="relative">
              <button
                onClick={() => setOpenNavbar((prev) => !prev)}
                className={buttonClass}
              >
                <FiUser size={20} />
              </button>

              {openNavbar && <UserNavbar />}
            </div>
          </>
        )}
      </div>
      {activeForm === "register" && (
        <FormRegister
          onClose={() => setActiveForm(null)}
          onSwitchToLogin={() => setActiveForm("login")}
        />
      )}

      {activeForm === "login" && (
        <FormLogin
          onClose={() => setActiveForm(null)}
          onSwitchToRegister={() => setActiveForm("register")}
        />
      )}
    </div>
  );
};
