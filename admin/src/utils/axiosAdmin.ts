import axios from "axios";
import { API } from "../config/api";
import { getStore } from "../redux/storeRef";
import { refreshAdminTokenSuccess } from "../redux/Auth/authSlice"

const axiosAdmin = axios.create({
  baseURL: API,
  withCredentials: true,
});

axiosAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const store = getStore();
    if (
      error.response?.status === 401 && 
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${API}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        store.dispatch(refreshAdminTokenSuccess(newToken));

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosAdmin(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("admin_profile");
        localStorage.removeItem("admin_accessToken");
        
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;