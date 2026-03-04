import axiosInstance from "../utils/axiosInstance";
import { API } from "../config/api";
import type { CreateTranslatePayload } from "../types/translateType";

const API_TRANSLATE = `${API}/translate`;

export const createTranslateApi = async (
  payload: CreateTranslatePayload
) => {
  const res = await axiosInstance.post(`${API_TRANSLATE}/create`, payload);
  return res.data;
};

