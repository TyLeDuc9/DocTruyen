import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CountFavoriteStory,
  FavoriteCreateRequest,
  FavoriteMeResponse,
  FavoriteDeleteResponse,
} from "../../types/favoriteType";
import {
  createFavoriteApi,
  deleteFavoriteApi,
  getFavoriteMeApi,
  getCountFavoriteStoryApi,
} from "./favoriteApi";

export const getFavoriteMe = createAsyncThunk<
  FavoriteMeResponse,
  void,
  { rejectValue: string }
>("favorite/me", async (_, { rejectWithValue }) => {
  try {
    return await getFavoriteMeApi();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("Get favorite list failed");
  }
});

export const getCount = createAsyncThunk<
  CountFavoriteStory,
  string,
  { rejectValue: string }
>("favorite/count", async (storyId, { rejectWithValue }) => {
  try {
    return await getCountFavoriteStoryApi(storyId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Get favorite count failed"
      );
    }
    return rejectWithValue("Get favorite count failed");
  }
});

export const deleteFavorite = createAsyncThunk<
  FavoriteDeleteResponse,
  string,
  { rejectValue: string }
>("favorite/delete", async (storyId, { rejectWithValue }) => {
  try {
    const response = await deleteFavoriteApi(storyId);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Unfavorite failed"
      );
    }
    return rejectWithValue("Unfavorite failed");
  }
});

export const createFavorite = createAsyncThunk(
  "favorite/create",
  async (data: FavoriteCreateRequest, { rejectWithValue }) => {
    try {
      return await createFavoriteApi(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Follow failed");
    }
  }
);
