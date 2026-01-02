import React from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
export const Layout = () => {
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
