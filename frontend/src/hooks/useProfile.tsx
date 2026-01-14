import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { getMeUser, updateUser } from "../redux/User/userThunk";
import avatar from "../assets/logo/avatar.jpg";

interface ProfileForm {
  userName: string;
  avatar: File | null;
  preview: string;
}

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile, loading } = useSelector(
    (state: RootState) => state.user
  );

  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<ProfileForm>({
    userName: "",
    avatar: null,
    preview: "",
  });

  // Lấy thông tin user
  useEffect(() => {
    dispatch(getMeUser());
  }, [dispatch]);

  // Đổ dữ liệu vào form
  useEffect(() => {
    if (userProfile) {
      setFormData({
        userName: userProfile.userName || "",
        avatar: null,
        preview: userProfile.avatarUrl || avatar,
      });
    }
  }, [userProfile]);

  // Chọn ảnh mới
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
      preview: URL.createObjectURL(file),
    }));
  };

  // Lưu thay đổi
  const handleSubmit = () => {
    const data = new FormData();
    data.append("userName", formData.userName);
    if (formData.avatar) data.append("avatar", formData.avatar);

    dispatch(updateUser(data));
  };

  return {
    userProfile,
    loading,
    formData,
    showPreview,
    setShowPreview,
    setFormData,
    handleFileChange,
    handleSubmit,
  };
};
