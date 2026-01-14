import type {
  UpdateUserResponse,
  GetMeResponse
} from "../../types/userType";
import axiosInstance from "../../utils/axiosInstance";

export const getMeApi=async():Promise<GetMeResponse>=>{
  const res=await axiosInstance.get('/user/me')
  return res.data
}
export const updateUserApi = async (
  data: FormData
): Promise<UpdateUserResponse> => {
  const res = await axiosInstance.put<UpdateUserResponse>(
    "/user/update",
    data
  );
  return res.data;
};
