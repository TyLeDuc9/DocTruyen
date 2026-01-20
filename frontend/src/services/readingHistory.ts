import axiosInstance from "../utils/axiosInstance";
import type {
  ReadingHistoryData,
  ReadingHistoryResponse,
  ReadingHistoryRequest,
  ReadingHistoryListResponse,
  ChapterHistoryReponse,
  GetChapterParams,
  GetChapterHistoryListResponse,
  DeleteChapterRequest
} from "../types/readingHistoryType";

export const checkChapterApi=async(chapterId:string)=>{
  const res=await axiosInstance.get(`/reading-history/check/chapter/${chapterId}`)
  return res.data 
}
export const deleteChapterApi=async({chapterId}:DeleteChapterRequest)=>{
  return axiosInstance.delete(`/reading-history/chapter/${chapterId}`)
}

export const getChapterHistoryApi=async(params?:GetChapterParams
):Promise<GetChapterHistoryListResponse>=>{
  const res=await axiosInstance.get<GetChapterHistoryListResponse>('/reading-history/chapter', {params}) 
  return res.data 

}

export const saveChapterHistoryApi = async (
  data: ReadingHistoryRequest,
): Promise<ChapterHistoryReponse> => {
  const res = await axiosInstance.post<ChapterHistoryReponse>(
    "/reading-history/chapter",
    data,
  );
  return res.data
};

export const saveReadingHistory = async (
  data: ReadingHistoryRequest,
): Promise<ReadingHistoryData> => {
  const res = await axiosInstance.post<ReadingHistoryResponse>(
    "/reading-history/story",
    data,
  );

  return res.data.data;
};

export const getReadingHistory = async (): Promise<ReadingHistoryData[]> => {
  const res = await axiosInstance.get<ReadingHistoryListResponse>(
    "/reading-history/story",
  );
  return res.data.data;
};
