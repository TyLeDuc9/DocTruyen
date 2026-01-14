import { FiBookmark, FiUser, FiLogOut } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const {loading , error,handleLogout }=useLogout()
 

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi tải</div>;

  const userNavbar = [
    {
      id: 1,
      name: "Theo dõi",
      icon: <FiBookmark size={18} />,
      to: "/follow",
    },
    {
      id: 3,
      name: "Tài khoản",
      icon: <FiUser size={18} />,
      to: "/profile",
    },
    {
      id: 4,
      name: "Đăng xuất",
      icon: <FiLogOut size={18} />,
      action: handleLogout,
    },
  ];

  return (
    <div className="absolute right-0  w-48 bg-main shadow-lg rounded-md z-50">
      <ul className="py-2">
        {userNavbar.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              if (item.to) navigate(item.to);
              if (item.action) item.action();
            }}
            className="flex items-center gap-1 hover:text-yellow-300 pl-4 py-2 text-white text-base cursor-pointer hover:bg-main/80 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
