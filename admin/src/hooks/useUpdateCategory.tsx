import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategorySlug, updateCategoryApi } from "../services/categoryApi";
import type { CategoryUpdateRequest } from "../types/categoryType";
export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [form, setForm] = useState<CategoryUpdateRequest>({
    name: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getCategorySlug(slug);
        setForm({
          name: data.category.name || "",
          content: data.category.content || "",
        });
      } catch {
        setError("Không lấy được dữ liệu category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    try {
      setLoading(true);
      await updateCategoryApi(slug, form);
      navigate("/admin/category");
    } catch {
      setError("Update category thất bại");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
