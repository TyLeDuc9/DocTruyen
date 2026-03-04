import axiosAdmin from "../utils/axiosAdmin";
import { API } from "../config/api";
import type {TranslateAllResponse } from "../types/translateType";

const API_TRANSLATE = `${API}/translate`;

export const deleteTranslateApi=async(id:string)=>{
  const res=await axiosAdmin.delete(`${API_TRANSLATE}/${id}`)
  return res.data
}

export const getAllTranslate=async():Promise<TranslateAllResponse>=>{
  const res=await axiosAdmin.get(`${API_TRANSLATE}/all`)
  return res.data

}
