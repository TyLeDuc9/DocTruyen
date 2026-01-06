
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
        store.dispatch({ type: "auth/logout/fulfilled" });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
