import { createSlice } from "@reduxjs/toolkit";
import type { Favorite } from "../../types/favoriteType";
import {
  createFavorite,
  deleteFavorite,
  getCount,
  getFavoriteMe,
} from "./favoriteThunk";

interface FavoriteState {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null,
  count: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetFavorteState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =====GET ME FAVORITE =====
      .addCase(getFavoriteMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoriteMe.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(getFavoriteMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // =====GET COUNT FAVORITE =====
      .addCase(getCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCount.fulfilled, (state, action) => {
        state.count = action.payload.totalFavorites;
      })
      .addCase(getCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ===== DELETE FAVORITE =====
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (favorite) => favorite.storyId._id !== action.payload.storyId
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== CREATE FAVORITE =====
      .addCase(createFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetFavorteState } = favoriteSlice.actions;
export default favoriteSlice.reducer;
