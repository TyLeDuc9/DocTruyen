import type { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/Auth/authThunk";
import { logoutProfile } from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFollowState } from "../redux/Follow/followSlice";
import { resetFavorteState } from "../redux/Favorite/favoriteSlice";
export const useLogout = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutProfile());
    dispatch(resetFollowState());
    dispatch(resetFavorteState())
    navigate("/");
  };
  return {
    handleLogout,
    loading,
    error,
  };
};
