import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/userType";
import { login, logout } from "../Auth/authThunk";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin")!)
    : null,
  accessToken: localStorage.getItem("admin_accessToken"),
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    refreshAdminTokenSuccess: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("admin_accessToken", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.user;
        if (user.role !== "admin") {
          state.error = "Không có quyền admin";
          return;
        }

        state.user = user;
        state.accessToken = action.payload.accessToken;

        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.setItem("admin_accessToken", action.payload.accessToken);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("admin");
        localStorage.removeItem("admin_accessToken");
      });
  },
});

export const { refreshAdminTokenSuccess } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
