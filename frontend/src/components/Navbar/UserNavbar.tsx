import { userNavbar } from "../../config/userNavbar";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const {loading ,handleLogout }=useLogout()
  const menuItems=userNavbar(handleLogout).filter(item=>["Theo dõi", "Tài khoản", "Đăng xuất"].includes(item.name))


  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="absolute right-0  w-48 bg-main shadow-lg rounded-md z-50">
      <ul className="py-2">
        {menuItems.map((item) => (
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
