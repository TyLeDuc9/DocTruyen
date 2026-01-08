import type {Favorite,FavoriteCreateRequest,
    FavoriteDeleteResponse,FavoriteMeResponse,CountFavoriteStory} from '../../types/favoriteType'
import axiosInstance from '../../utils/axiosInstance'

export const getFavoriteMeApi=async():Promise<FavoriteMeResponse>=>{
    const res=await axiosInstance.get('/favorite/me')
    return res.data
}
export const getCountFavoriteStoryApi=async(storyId:string):Promise<CountFavoriteStory>=>{
    const res=await axiosInstance.get(`/favorite/count/${storyId}`)
    return res.data
}

export const deleteFavoriteApi=async(storyId:string):Promise<FavoriteDeleteResponse>=>{
    const res=await axiosInstance.delete(`/favorite/${storyId}`)
    return res.data
}

export const createFavoriteApi=async(data:FavoriteCreateRequest):Promise<Favorite>=>{
    const res=await axiosInstance.post("/favorite/create", data);
    return res.data.favorite
}