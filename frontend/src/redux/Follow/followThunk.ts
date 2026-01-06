import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  FollowCreateRequest,
  FollowMeResponse,
  FollowDeleteResponse,
} from "../../types/followType";
import { createFollowApi, getFollowMeApi, deleteFollowApi } from "./followApi";
export const deleteFollow = createAsyncThunk<
  FollowDeleteResponse,
  string,
  { rejectValue: string }
>("follow/delete", async (storyId, { rejectWithValue }) => {
  try {
    return await deleteFollowApi(storyId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Unfollow failed"
      );
    }
    return rejectWithValue("Unfollow failed");
  }
});

export const getFollowMe = createAsyncThunk<
  FollowMeResponse,
  void,
  { rejectValue: string }
>("follow/me", async (_, { rejectWithValue }) => {
  try {
    return await getFollowMeApi();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("Get follow list failed");
  }
});

export const createFollow = createAsyncThunk(
  "follow/create",
  async (data: FollowCreateRequest, { rejectWithValue }) => {
    try {
      return await createFollowApi(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Follow failed");
    }
  }
);
