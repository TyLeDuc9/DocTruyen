import logo from "../../assets/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiBell } from "react-icons/fi";
import type { RootState, AppDispatch } from "../../redux/store";
import { FormRegister } from "../Form/FormRegister";
import { FormLogin } from "../Form/FormLogin";
import { UserNavbar } from "../Navbar/UserNavbar";
import avatarDefault from "../../assets/logo/avatar.jpg";
import { getMeUser } from "../../redux/User/userThunk";
import { useEffect, useState } from "react";
import { SearchStory } from "../Search/SearchStory";
import { GenreNotify } from "../Genre/GenreNotify";

export const TopHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userProfile } = useSelector((state: RootState) => state.user);

  const [openNavbar, setOpenNavbar] = useState(false);
  const [openSearchMobile, setOpenSearchMobile] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [activeForm, setActiveForm] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    if (user && !userProfile) {
      dispatch(getMeUser());
    }
  }, [user, userProfile, dispatch]);

  const buttonClass =
    "lg:p-3 p-2 rounded-full border border-[#236288] text-[#236288] hover:bg-[#236288] hover:text-white transition cursor-pointer";

  const btnFormClass =
    "bg-[#236288] hover:bg-[#236288]/80 text-white px-3 py-2 rounded-sm lg:text-base text-xs cursor-pointer";

  return (
    <div className="w-full bg-white">
      
      {/* ===== HEADER ROW ===== */}
      <div className="flex justify-between items-center p-2">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="lg:w-20 lg:h-24 w-10 h-10 object-contain"
          />

          {/* Desktop Search */}
          <div className="hidden lg:block lg:w-96">
            <SearchStory />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 lg:gap-4">

          {/* Mobile Search Button */}
          <button
            onClick={() => setOpenSearchMobile((prev) => !prev)}
            className="lg:hidden p-2 rounded-full border border-[#236288] text-[#236288]"
          >
            <FiSearch size={16} />
          </button>

          {!user ? (
            <>
              <button
                onClick={() => setActiveForm("register")}
                className={btnFormClass}
              >
                Đăng ký
              </button>
              <button
                onClick={() => setActiveForm("login")}
                className={btnFormClass}
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <>
              {/* Notification */}
              <div
                className="relative"
                onMouseEnter={() => setOpenNotify(true)}
                onMouseLeave={() => setOpenNotify(false)}
              >
                <button className={buttonClass}>
                  <FiBell size={20} />
                </button>

                {openNotify && (
                  <div className="absolute lg:-right-4 -right-1 top-full mt-2 lg:w-[420px] w-[300px] z-50">
                    <GenreNotify />
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="relative">
                <button
                  onClick={() => setOpenNavbar((prev) => !prev)}
                >
                  <img
                    src={userProfile?.avatarUrl || avatarDefault}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                {openNavbar && <UserNavbar />}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== MOBILE SEARCH FULL WIDTH ===== */}
      {openSearchMobile && (
        <div className="px-3 pb-3 lg:hidden">
          <SearchStory />
        </div>
      )}

      {/* ===== AUTH MODAL ===== */}
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