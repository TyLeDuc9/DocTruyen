import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Auth/authThunk";
import { setUser } from "../redux/User/userSlice";
import type { AppDispatch, RootState } from "../redux/store";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      const result = await dispatch(login(formData)).unwrap();
      dispatch(setUser(result.user));
      setFormData({ email: "", password: "" });
      navigate("/admin")
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
