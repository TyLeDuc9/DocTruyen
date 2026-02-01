// src/redux/Auth/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ChangePassRequest, AuthRequest } from "../../types/authType";
import { loginAdminApi,logoutApi, changePassApi } from "./authApi";
//CHANGEPASS
export const changePass = createAsyncThunk(
  "auth/changePass",
  async (data: ChangePassRequest, { rejectWithValue }) => {
    try {
      return await changePassApi(data);
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(
          error.response?.data?.message || "Change password failed"
        );
      return rejectWithValue("Change password failed");
    }
  }
);
// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data: AuthRequest, { rejectWithValue }) => {
    try {
      return await loginAdminApi(data);
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data?.message || "Login failed");
      return rejectWithValue("Login failed");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});
