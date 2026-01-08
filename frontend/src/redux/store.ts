//store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import followReducer from "./Follow/followSlice";
import favoriteReducer from './Favorite/favoriteSlice'
import { injectStore } from "./storeRef";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    follow:followReducer,
    favorite:favoriteReducer
  },
});
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
