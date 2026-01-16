import { userNavbar } from "../../config/userNavbar";
import { useLogout } from "../../hooks/useLogout";
import { useLocation, useNavigate } from "react-router-dom";
import { handleMenuClick } from "../../utils/menuNavigate";
export const MenuNavbar = () => {
  const { handleLogout } = useLogout();
  const location = useLocation();
  const menuItems = userNavbar(handleLogout);
  const navigate = useNavigate();

  return (
    <div className="w-56 bg-main shadow-2xl rounded-xl h-72  overflow-hidden">
      <ul>
        {menuItems.map((item) => {
          const isActive = item.to && location.pathname === item.to;

          return (
            <li
              key={item.id}
              onClick={() => handleMenuClick(item, navigate)}
              className={`flex items-center gap-3 pl-8 py-3
                text-base cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-yellow-400/90 text-white"
                    : "text-white hover:text-yellow-400"
                }
                 
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
