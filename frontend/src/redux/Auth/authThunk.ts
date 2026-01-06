// src/redux/Auth/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginApi, registerApi, logoutApi } from "./authApi";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await loginApi(data);
    } catch (error) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.message || "Login failed");
      return rejectWithValue("Login failed");
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await registerApi(data);
    } catch (error) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.message || "Register failed");
      return rejectWithValue("Register failed");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});
