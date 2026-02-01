import axios from "axios";
import axiosAdmin from "../../utils/axiosAdmin";
import { API } from "../../config/api";
import type {
  LoginResponse,
  AuthRequest,
  ChangePassRequest,
} from "../../types/authType";

export const loginAdminApi = async (
  data: AuthRequest
): Promise<LoginResponse> => {
  const res = await axios.post(`${API}/auth/login-admin`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const refreshApi = async (): Promise<{ accessToken: string }> => {
  const res = await axios.post(
    `${API}/auth/refresh-token`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

export const logoutApi = async () => {
  await axiosAdmin.post(`${API}/auth/logout`, {}, { withCredentials: true });
};

export const changePassApi = async (data: ChangePassRequest) => {
  const res = await axiosAdmin.put("/auth/change-password", data);
  return res.data;
};
