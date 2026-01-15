import type { NavigateFunction } from "react-router-dom";
import type { MenuItem } from "../types/userType";
export const handleMenuClick = (
  item: MenuItem,
  navigate: NavigateFunction
) => {
  if (item.action) {
    item.action();
  } 
  else if (item.external && item.url) {
    const navigation = confirm("Bạn có muốn rời khỏi trang web này không?");
    if (navigation) {
      window.open(item.url, "_blank");
    }
  } 
  else if (item.to) {
    navigate(item.to);
  }
};
