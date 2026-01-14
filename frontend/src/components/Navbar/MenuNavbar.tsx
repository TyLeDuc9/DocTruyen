import React from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiLock,
} from "react-icons/fi";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
export const MenuNavbar = () => {
  const { loading, error, handleLogout } = useLogout();
  const navigate = useNavigate();
  const userNavbar = [
    {
      id: 1,
      name: "Yêu thích",
      icon: <FiHeart size={18} />,
      to: "/follow",
    },
    {
      id: 6,
      name: "Mua truyện",
      icon: <FiShoppingCart size={18} />,
      external: true,
      url: "https://bookstore-1-3bb1.onrender.com/",
    },
    {
      id: 2,
      name: "Tài khoản",
      icon: <FiUser size={18} />,
      to: "/profile",
    },
    {
      id: 3,
      name: "Đổi mật khẩu",
      icon: <FiLock size={18} />,
      to: "/change-password",
    },
    {
      id: 4,
      name: "Đăng xuất",
      icon: <FiLogOut size={18} />,
      action: handleLogout,
    },
  ];

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi tải</div>;
  return (
    <div className="w-56 bg-main shadow-2xl rounded-xl overflow-hidden">
      <ul className="">
        {userNavbar.map((item, index) => (
          <li
            key={item.id}
            onClick={() => {
              if (item.external && item.url) {
                window.open(item.url, "_blank");
              } else if (item.to) {
                navigate(item.to);
              }
            }}
            className={`flex items-center gap-3 pl-8 py-3
              text-white text-base cursor-pointer 
              hover:bg-yellow-400/20 hover:text-yellow-400 
              transition-all duration-200
              ${
                index === userNavbar.length - 1
                  ? "border-t border-white/20"
                  : ""
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
