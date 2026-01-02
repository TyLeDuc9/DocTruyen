import { API } from "../../config/api";
import type { LoginResponse, RegisterResponse } from "../../types/authType";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};

export const registerApi = async (data: {
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};



