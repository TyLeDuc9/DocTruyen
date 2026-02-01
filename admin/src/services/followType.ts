import axiosAdmin from "../utils/axiosAdmin";
import type {FollowAllResponse, FollowParams} from '../types/followType'
export const forceDeleteFollowApi=async(id:string)=>{
    const res=await axiosAdmin.delete(`/follow/force/${id}`)
    return res.data
}
export const getAllFollowApi=async(params:FollowParams):Promise<FollowAllResponse>=>{
    const res=await axiosAdmin.get<FollowAllResponse>("/follow/all", {params})
    return res.data
}