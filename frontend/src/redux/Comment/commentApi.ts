import type {
  CreateCommentRequest,
  CommentByStoryId,
  GetCommentParams,
  CreateReplyResponse,
  CreateReplyRequest,
  ReactRequest,
  ReactResponse,
  DeleteRequest,
  DeleteReplyRequest,
  GetCommentByChapterParams
} from "../../types/commentType";
import axiosInstance from "../../utils/axiosInstance";



export const deleteReplyApi=async(data:DeleteReplyRequest):Promise<{message:string}>=>{
  const res=await axiosInstance.delete(`/comment/delete/reply/${data.commentId}/${data.replyId}`)
  return res.data
}

export const deleteCommentApi = async (data: DeleteRequest): Promise<{ message: string }> => {
  const res = await axiosInstance.delete(`/comment/delete/${data.commentId}`);
  return res.data;
};

export const reactReplyApi=async(
  data:ReactRequest,
  commentId:string,
  replyId:string
):Promise<ReactResponse>=>{
  const res=await axiosInstance.put(`/comment/react/reply/${commentId}/${replyId}`, data)
  return res.data
}
export const reactCommentApi=async(
  data:ReactRequest,
  commentId:string
):Promise<ReactResponse>=>{
  const res=await axiosInstance.put(`/comment/react/${commentId}`, data)
  return res.data
}
export const createCommentReplyApi = async (
  data: CreateReplyRequest
): Promise<CreateReplyResponse> => {
  const res = await axiosInstance.post(`/comment/reply/${data.commentId}`, {
    content: data.content,
  });

  return res.data;
};
export const getCommentByChapterIdApi = async (
  params: GetCommentByChapterParams
): Promise<CommentByStoryId> => {
    const res = await axiosInstance.get<CommentByStoryId>(
      `/comment/chapter/${params.chapterId}`,
      { params }
    );
    return res.data;
};
export const getCommentByStoryIdApi = async (
  params: GetCommentParams
): Promise<CommentByStoryId> => {
    const res = await axiosInstance.get<CommentByStoryId>(
      `/comment/story/${params.storyId}`,
      { params }
    );
    return res.data;
};

export const createCommentApi = async (data: CreateCommentRequest) => {
  const res = await axiosInstance.post("/comment/create", data);
  return res.data;
};
