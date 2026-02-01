//store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import userReducer from "./User/userSlice";
import { injectStore } from "./storeRef";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
