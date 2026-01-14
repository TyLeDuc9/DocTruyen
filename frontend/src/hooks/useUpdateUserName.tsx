import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { updateUser } from "../redux/User/userThunk";
import { useState } from "react";
export const useUpdateUserName = () => {
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const savedUserName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      return alert("Tên không được để trống");
    }
    const formData = new FormData();
    formData.append("userName", displayName);
    await dispatch(updateUser(formData));
  };
  
  return {
    displayName,
    setDisplayName,
    savedUserName,
  };
};
