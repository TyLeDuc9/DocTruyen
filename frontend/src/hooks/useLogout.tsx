import type { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/Auth/authThunk";
import { logoutProfile } from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export const useLogout = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutProfile());
    navigate("/");
  };
  return {
    handleLogout,
    loading,
    error
  };
};
