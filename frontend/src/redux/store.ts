//store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import followReducer from "./Follow/followSlice";
import { injectStore } from "./storeRef";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    follow:followReducer
  },
});
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
