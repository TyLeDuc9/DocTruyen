import logo from "../../assets/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { FiBell } from "react-icons/fi";
import { FormRegister } from "../Form/FormRegister";
import { FormLogin } from "../Form/FormLogin";
import { UserNavbar } from "../Navbar/UserNavbar";
import avatarDefault from "../../assets/logo/avatar.jpg";
import { getMeUser } from "../../redux/User/userThunk";
import { useEffect, useState } from "react";
import { SearchStory } from "../Search/SearchStory";
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
    <div className="flex justify-between ">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="logo"
          className="w-20 h-24 rounded-sm object-contain"
        />

        <div className="relative w-96">
          <SearchStory />
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
