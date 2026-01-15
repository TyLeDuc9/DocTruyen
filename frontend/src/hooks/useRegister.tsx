import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/Auth/authThunk";
import type { AppDispatch, RootState } from "../redux/store";
import React, { useState } from "react";

export const useRegister = (onSwitchToLogin: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

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
      const result = await dispatch(register(formData));

      if (register.fulfilled.match(result)) {
        setFormData({ email: "", password: "" });
        onSwitchToLogin();
      }
    } catch (err) {
      console.log("Register failed:", err);
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
