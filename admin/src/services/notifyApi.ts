import axiosAdmin from "../utils/axiosAdmin";
import type {CreateNotifyRequest, GetAllNotifyResponse, GetNotifyParams} from '../types/notifyType'
export const deleteNotifyApi=async(id:string)=>{
    const res=await axiosAdmin.delete(`/notify/${id}`)
    return res.data
}

export const getAllNotify=async(params:GetNotifyParams):Promise<GetAllNotifyResponse>=>{
    const res=await axiosAdmin.get<GetAllNotifyResponse>('/notify/all', {params})
    return res.data
}

export const createNotifyy=async(data:CreateNotifyRequest)=>{
    const res=await axiosAdmin.post('/notify/create/broadcast', data)
    return res.data
}