
import axios from "axios";
import { API } from "../config/api";
import { getStore } from "../redux/storeRef";
import { refreshTokenSuccess } from "../redux/Auth/authSlice";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const store = getStore();

    const isAuthRoute =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh-token");

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        const newAccessToken = res.data.accessToken;

        store.dispatch(refreshTokenSuccess(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
