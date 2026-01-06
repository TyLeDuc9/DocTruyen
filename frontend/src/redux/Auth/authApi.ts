// src/redux/Auth/authApi.ts
import type { LoginResponse, RegisterResponse } from "../../types/authType";
import axiosInstance from "../../utils/axiosInstance";

export const loginApi = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: { email: string; password: string }): Promise<RegisterResponse> => {
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
