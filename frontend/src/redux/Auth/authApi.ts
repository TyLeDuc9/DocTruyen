// src/redux/Auth/authApi.ts
import type { LoginResponse, RegisterResponse ,AuthRequest, ChangePassRequest} from "../../types/authType";
import axiosInstance from "../../utils/axiosInstance";
export const changePassApi=async(data:ChangePassRequest)=>{
  const res=await axiosInstance.put('/auth/change-password', data)
  return res.data
}

export const loginApi = async (data:AuthRequest): Promise<LoginResponse> => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data:AuthRequest): Promise<RegisterResponse> => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};

export const refreshApi = async (): Promise<{ accessToken: string }> => {
  const res = await axiosInstance.post("/auth/refresh-token");
  return res.data;
};
