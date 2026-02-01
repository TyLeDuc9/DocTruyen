import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/userType";
import { updateUser, getMeUser } from "./userThunk";

interface UserState {
  userProfile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userProfile: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userProfile = action.payload;
    },
    logoutProfile: (state) => {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =====GET ME=====
      .addCase(getMeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.user;
        
      })
      .addCase(getMeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // =====UPDATE=====
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setUser, logoutProfile } = userSlice.actions;
export default userSlice.reducer;
