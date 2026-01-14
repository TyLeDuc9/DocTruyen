import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UpdateUserResponse, GetMeResponse } from "../../types/userType";
import { updateUserApi, getMeApi } from "./userApi";
import axios from "axios";
export const getMeUser = createAsyncThunk<
  GetMeResponse,
  void,
  { rejectValue: string }
>("user/me", async (_, { rejectWithValue }) => {
  try {
    return await getMeApi();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Get user failed"
      );
    }
    return rejectWithValue("Get user failed");
  }
});

export const updateUser = createAsyncThunk<
  UpdateUserResponse,
  FormData,
  { rejectValue: string }
>("user/updateUser", async (data, { rejectWithValue }) => {
  try {
    return await updateUserApi(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
    return rejectWithValue("Update user failed");
  }
});
