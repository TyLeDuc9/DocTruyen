import axiosAdmin from "../utils/axiosAdmin";
import type {FavoriteParams, FavoriteAllResponse} from '../types/favoriteType'
export const forceDeleteFavoriteApi=async(id:string)=>{
    const res=await axiosAdmin.delete(`/favorite/force/${id}`)
    return res.data
}
export const getAllFavoriteApi=async(params:FavoriteParams):Promise<FavoriteAllResponse>=>{
    const res=await axiosAdmin.get<FavoriteAllResponse>("/favorite/all", {params})
    return res.data
}