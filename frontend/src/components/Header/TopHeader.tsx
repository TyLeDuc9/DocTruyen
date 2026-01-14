import logo from "../../assets/logo/logo.png";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState , AppDispatch} from "../../redux/store";
import { BsLightbulb } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FormRegister } from "../Form/FormRegister";
import { FormLogin } from "../Form/FormLogin";
import { UserNavbar } from "../Navbar/UserNavbar";
import avatarDefault from "../../assets/logo/avatar.jpg";
import { getMeUser } from "../../redux/User/userThunk";
export const TopHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [openNavbar, setOpenNavbar] = useState(false);
  const { userProfile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
  if (user && !userProfile) {
    dispatch(getMeUser());
  }
}, [user, userProfile, dispatch]);
  
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
                className="cursor-pointer"
              >
                <img
                  src={userProfile?.avatarUrl || avatarDefault}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
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
