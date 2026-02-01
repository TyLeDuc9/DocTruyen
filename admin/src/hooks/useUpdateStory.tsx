import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  UpdateStoryFormState,
  UpdateStoryRequest,
  UpdateStoryResponse,
} from "../types/storyType";
import { updateStoryApi } from "../services/storyApi";
import { useStorySlug } from "../hooks/useStorySlug";

type CategoryRef = string | { _id: string };

export const useUpdateStory = () => {
  const { slug } = useParams();
  const { storySlug, loading: loadingStory } = useStorySlug(slug);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<UpdateStoryResponse | null>(null);
  const [formData, setFormData] = useState<UpdateStoryFormState>({
    name: "",
    alternateName: [],
    author: "",
    country: "",
    totalChapters: "",
    status: "UPCOMING",
    categoryId: [],
    description: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ====== ĐỔ DATA KHI EDIT ======
  useEffect(() => {
    if (!storySlug) return;

    setFormData({
      name: storySlug.name,
      alternateName: storySlug.alternateName || [],
      author: storySlug.author || "",
      country: storySlug.country || "",
      status: storySlug.status,
      categoryId:
        (storySlug.categoryId as CategoryRef[] | undefined)?.map((c) =>
          typeof c === "string" ? c : c._id,
        ) || [],
      description: storySlug.description || "",
      totalChapters:
        storySlug.totalChapters !== undefined
          ? String(storySlug.totalChapters)
          : "",
    });

    setPreviewUrl(storySlug.thumbnail || null);
  }, [storySlug]);

  // cleanup blob preview
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ====== HANDLERS ======
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlternateNameChange = (names: string[]) => {
    setFormData((prev) => ({ ...prev, alternateName: names }));
  };

  const handleCategoryChange = (ids: string[]) => {
    setFormData((prev) => ({ ...prev, categoryId: ids }));
  };

  const handleThumbnailChange = (file: File) => {
    setFormData((prev) => ({ ...prev, thumbnail: file }));

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeThumbnail = () => {
    setFormData((prev) => {
      const clone = { ...prev };
      delete clone.thumbnail;
      return clone;
    });

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAlterName = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      alternateName: prev.alternateName?.filter((_, i) => i !== index),
    }));
  };

  // ====== SUBMIT ======
  const updateStory = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const payload: UpdateStoryRequest = {
        name: formData.name,
        alternateName: formData.alternateName,
        author: formData.author || undefined,
        country: formData.country || undefined,
        status: formData.status,
        categoryId: formData.categoryId,
        description: formData.description || undefined,
        thumbnail: formData.thumbnail,
        totalChapters:
          formData.totalChapters !== ""
            ? Number(formData.totalChapters)
            : undefined,
      };

      const res = await updateStoryApi(slug, payload);
      setData(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    // data
    formData,
    setFormData,
    previewUrl,
    fileInputRef,

    // handlers
    handleChange,
    handleAlternateNameChange,
    handleCategoryChange,
    handleThumbnailChange,
    removeThumbnail,
    removeAlterName,

    // submit
    updateStory,

    // state
    loading: loading || loadingStory,
    error,
    data,
  };
};
