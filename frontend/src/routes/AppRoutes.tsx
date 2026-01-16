import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Home } from "../pages/Home/Home";
import { Category } from "../pages/Category/Category";
import { AllStory } from "../pages/AllStory/AllStory";
import { SlugStory } from "../pages/SlugStory/SlugStory";
import { ChapterDetail } from "../pages/ChaperDetail/ChapterDetail";
import { Follow } from "../components/Follow/Follow";
import { FormChangePass } from "../components/Form/FormChangePass";
import { User } from "../pages/User/User";
import { FormInformation } from "../components/Form/FormInformation";
import { PrivateRoute } from "./PrivateUserRoute";
import { HistoryStory } from "../components/History/HistoryStory";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="the-loai/:slug" element={<Category />} />
        <Route path="all" element={<AllStory />} />
        <Route path="manga/:slug" element={<SlugStory />} />
        <Route path="chapter/detail/:chapterSlug" element={<ChapterDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="user" element={<User />}>
            <Route path="profile" element={<FormInformation />} />
            <Route path="follow" element={<Follow />} />
            <Route path="change-password" element={<FormChangePass />} />
            <Route path="history" element={<HistoryStory />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
