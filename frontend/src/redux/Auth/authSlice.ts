// src/redux/Auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/userType";
import { login, register, logout } from "./authThunk";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // REGISTER
      .addCase(register.pending, (state) => { state.loading = true; })
      .addCase(register.fulfilled, (state) => { state.loading = false; state.error = null; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      });
  },
});

export default authSlice.reducer;
export const { refreshTokenSuccess } = authSlice.actions;
