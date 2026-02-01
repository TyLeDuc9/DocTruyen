import axios from "axios";
import { API } from "../config/api";
import axiosAdmin from "../utils/axiosAdmin";
import type {GetAllChapterResponse,CreateChapterRequest, CreateChapterResponse, ChapterParams} from '../types/chapterType'
export const deleteChapterApi=async(id:string)=>{
  const res=await axiosAdmin.delete(`/chapter/force-delete/${id}`)
  return res.data
}
export const restoreChapterApi = async (id: string) => {
  const res = await axiosAdmin.patch(`/chapter/restore/${id}`)
  return res.data
}

export const softDeleteChapterApi = async (id: string) => {
  const res = await axiosAdmin.delete(`/chapter/soft-delete/${id}`)
  return res.data 
}


export const createChapter = async (
  data: CreateChapterRequest,
  images?: File[]
): Promise<CreateChapterResponse> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("chapterMain", data.chapterMain.toString());
  formData.append("storyId", data.storyId);
  if (data.chapterSub !== undefined) {
    formData.append("chapterSub", data.chapterSub.toString());
  }
  if (data.content) {
    formData.append("content", data.content);
  }
  if (images && images.length > 0) {
    images.forEach((file) => {
      formData.append("images", file);
    });
  }

  const res = await axiosAdmin.post<CreateChapterResponse>(
    '/chapter/create',
    formData,
  );

  return res.data;
};
export const getAllChapter = async (
  params: ChapterParams
): Promise<GetAllChapterResponse> => {
  const res = await axios.get<GetAllChapterResponse>(
    `${API}/chapter/all`,
    { params }
  );
  return res.data;
};