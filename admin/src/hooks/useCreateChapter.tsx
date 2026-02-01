import { useState, useRef } from "react";
import type { CreateChapterRequest } from "../types/chapterType";
import { createChapter } from "../services/chapterApi";

interface CreateChapterFormState {
  title: string;
  chapterMain: string; 
  chapterSub: string;
  content: string;
  storyId: string;
  images: File[];
}

export const useCreateChapter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<CreateChapterFormState>({
    title: "",
    chapterMain: "",
    chapterSub: "",
    content: "",
    storyId: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;
    setFormData(prev => ({
      ...prev,
      images: Array.from(files),
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const resetImages = () => {
    setFormData(prev => ({ ...prev, images: [] }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ====== SUBMIT ====== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.chapterMain || !formData.storyId) {
      setError("Vui lòng nhập đầy đủ dữ liệu bắt buộc");
      return;
    }

    const payload: CreateChapterRequest = {
      title: formData.title,
      chapterMain: Number(formData.chapterMain),
      chapterSub:
        formData.chapterSub !== ""
          ? Number(formData.chapterSub)
          : undefined,
      content: formData.content || undefined,
      storyId: formData.storyId,
    };

    try {
      setLoading(true);
      setError(null);

      await createChapter(payload, formData.images);

  
      setFormData({
        title: "",
        chapterMain: "",
        chapterSub: "",
        content: "",
        storyId: "",
        images: [],
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    }  catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    fileInputRef,

    handleChange,
    handleImagesChange,
    removeImage,
    resetImages,
    handleSubmit,
  };
};
