import { useState } from "react";
import { createTranslateApi } from "../services/translateApi";
import type { CreateTranslatePayload } from "../types/translateType";
export const useCreateTranslate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const createTranslate = async (payload: CreateTranslatePayload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await createTranslateApi(payload);
      return res.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createTranslate({ content });
    setContent("");
  };

  return {
    content,
    setContent,
    handleSubmit,
    loading,
    error,
  };
};
