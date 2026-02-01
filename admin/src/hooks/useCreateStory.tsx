import { useState, useRef } from "react";
import type { CreateStoryRequest } from "../types/storyType";
import { createStoryApi } from "../services/storyApi";

interface CreateStoryFormState {
  name: string;
  alternateName: string[];
  author: string;
  country: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "DROPPED";
  thumbnail: File | null;
  totalChapters: string; 
  categoryId: string[];
  description: string;
}

export const useCreateStory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const alterNameInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<CreateStoryFormState>({
    name: "",
    alternateName: [],
    author: "",
    country: "",
    status: "UPCOMING",
    thumbnail: null,
    totalChapters: "",
    categoryId: [],
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAlternateNameChange = (names: string[]) => {
    setFormData(prev => ({ ...prev, alternateName: names }));
  };

  const handleCategoryChange = (ids: string[]) => {
    setFormData(prev => ({ ...prev, categoryId: ids }));
  };

  const handleThumbnailChange = (file: File) => {
    setFormData(prev => ({ ...prev, thumbnail: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnail: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAlterName = (index: number) => {
    setFormData(prev => ({
      ...prev,
      alternateName: prev.alternateName.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      setError("Vui lòng chọn ảnh đại diện");
      return;
    }

    const payload: CreateStoryRequest = {
      name: formData.name,
      alternateName: formData.alternateName,
      author: formData.author || undefined,
      country: formData.country || undefined,
      status: formData.status,
      description: formData.description || undefined,
      categoryId: formData.categoryId,
      thumbnail: formData.thumbnail,
      totalChapters:
        formData.totalChapters !== ""
          ? Number(formData.totalChapters)
          : undefined,
    };

    try {
      setLoading(true);
      setError(null);
      await createStoryApi(payload);

      setFormData({
        name: "",
        alternateName: [],
        author: "",
        country: "",
        status: "UPCOMING",
        thumbnail: null,
        totalChapters: "",
        categoryId: [],
        description: "",
      });

      setPreviewUrl(null);
      if (alterNameInputRef.current) alterNameInputRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    previewUrl,
    fileInputRef,
    loading,
    error,
    handleChange,
    handleAlternateNameChange,
    handleCategoryChange,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    removeAlterName,
    alterNameInputRef,
  };
};
