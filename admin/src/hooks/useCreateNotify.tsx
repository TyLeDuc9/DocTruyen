import  { useState } from "react";
import { createNotifyy } from "../services/notifyApi";
import type { CreateNotifyRequest } from "../types/notifyType";

export const useCreateNotify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateNotifyRequest>({
    title: "",
    message: "",
    link: "",
    storyId: null,
    chapterId: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createNotifyy({
        title: form.title,
        message: form.message,
        link: form.link,
        storyId: form.storyId || null,
        chapterId: form.chapterId || null,
      });
      setForm({
        title: "",
        message: "",
        link: "",
        storyId: null,
        chapterId: null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading, error, handleChange, handleSubmit, form
  }
};
