import { Routes, Route } from "react-router-dom";
import { PrivateAdmin } from "./PrivateAdmin";
import { FormLogin } from "../pages/Login/FormLogin";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Home } from "../pages/Home/Home";
import { AllUser } from "../pages/User/AllUser";
import { AllCategory } from "../pages/Category/AllCategory";
import { AllStory } from "../pages/Story/AllStory";
import { AllChapter } from "../pages/Chapter/AllChapter";
import { Profile } from "../pages/Profile/Profile";
import { ChangePass } from "../pages/ChangePass/ChangePass";
import { TableStory } from "../pages/Story/TableStory";
import { AllFavorite } from "../pages/Favorite/AllFavorite";
import { AllFollow } from "../pages/Follow/AllFollow";
import { AllComment } from "../pages/Comment/AllComment";
import { CategoryCreate } from "../components/CategoryAction/CategoryCreate";
import { CategoryUpdate } from "../components/CategoryAction/CategoryUpdate";
import { CreateStory } from "../components/StoryAction/CreateStory";
import { UpdateStory } from "../components/StoryAction/UpdateStory";
import { CreateChapter } from "../components/ChapterAction/CreateChapter";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login-admin" element={<FormLogin />} />

      <Route element={<PrivateAdmin />}>
        <Route path="/admin" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<AllUser />} />
          <Route path="category" element={<AllCategory />} />
          <Route path="story" element={<AllStory />} />
          <Route path="story-table" element={<TableStory />} />
          <Route path="chapter" element={<AllChapter />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePass />} />
          <Route path="favorite" element={<AllFavorite />} />
          <Route path="follow" element={<AllFollow />} />
          <Route path="comment" element={<AllComment />} />
          <Route path="category/create" element={<CategoryCreate />} />
          <Route path="category/update/:slug" element={<CategoryUpdate />} />
          <Route path="story/create" element={<CreateStory />} />
          <Route path="story/update/:slug" element={<UpdateStory />} />
          <Route path="chapter/create" element={<CreateChapter />} />
        </Route>
      </Route>
    </Routes>
  );
};
