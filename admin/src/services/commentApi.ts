import axiosAdmin from "../utils/axiosAdmin";
import type { GetCommentsParams, CommentResponse } from "../types/commentType";
export const deleteReplyCommentApi=async(commentId:string, replyId:string )=>{
    const res=await axiosAdmin.delete(`/comment/reply/${commentId}/${replyId}`)
    return res.data
}

export const deleteParentCommentApi=async(id:string)=>{
    const res=await axiosAdmin.delete(`/comment/parent/${id}`)
    return res.data
}
export const getAllCommentApi=async(params:GetCommentsParams):Promise<CommentResponse>=>{
    const res=await axiosAdmin.get<CommentResponse>("/comment/all", {params})
    return res.data
}