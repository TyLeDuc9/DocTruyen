import axiosAdmin from "../utils/axiosAdmin";
import type {
  GetAllChapterReportParams,
GetAllChapterReportResponse, UpdateChapterReportStatus
} from "../types/chapterReportType";
export const deleteChapterReportApi=async(id:string)=>{
  const res=await axiosAdmin.delete(`/chapter-report/${id}`)
  return res
}

export const updateChapterReport=async(id:string, data:UpdateChapterReportStatus)=>{
  const res=await axiosAdmin.put(`/chapter-report/status/${id}`, data)
  return res
}

export const getAllChapterReport = async (
  params: GetAllChapterReportParams
): Promise<GetAllChapterReportResponse> => {
  const res = await axiosAdmin.get<GetAllChapterReportResponse>(
    "/chapter-report/all",
    { params }
  );

  return res.data;
};