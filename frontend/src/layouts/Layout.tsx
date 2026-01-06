import React from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowMe } from "../redux/Follow/followThunk";
import type { RootState } from "../redux/store";

import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
export const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getFollowMe() as any);
    }
  }, [user, dispatch]);
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
};
