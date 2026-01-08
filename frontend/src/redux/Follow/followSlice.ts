import { createSlice } from "@reduxjs/toolkit";
import type { Follow } from "../../types/followType";
import {
  createFollow,
  getFollowMe,
  deleteFollow,
  getCountFollow,
} from "./followThunk";

interface FollowState {
  follows: Follow[];
  loading: boolean;
  error: string | null;
  countFollow: number;
}

const initialState: FollowState = {
  follows: [],
  loading: false,
  error: null,
  countFollow: 0,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    resetFollowState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =====GET COUNT FOLLOW =====
      .addCase(getCountFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountFollow.fulfilled, (state, action) => {
        state.countFollow = action.payload.totalFollows;
      })
      .addCase(getCountFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== GET FOLLOW ME =====
      .addCase(getFollowMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowMe.fulfilled, (state, action) => {
        state.loading = false;
        state.follows = action.payload.follows;
      })
      .addCase(getFollowMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ===== CREATE FOLLOW =====
      .addCase(createFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFollow.fulfilled, (state, action) => {
        state.loading = false;
        state.follows.push(action.payload); // ✅ chuẩn type
      })
      .addCase(createFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== DELETE FOLLOW =====
      .addCase(deleteFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFollow.fulfilled, (state, action) => {
        state.loading = false;

        state.follows = state.follows.filter(
          (follow) => follow.storyId._id !== action.payload.storyId
        );
      })
      .addCase(deleteFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFollowState } = followSlice.actions;
export default followSlice.reducer;
