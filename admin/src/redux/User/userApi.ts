import type {
  UpdateUserResponse,
  GetMeResponse
} from "../../types/userType";
import axiosAdmin from "../../utils/axiosAdmin";

export const getMeApi=async():Promise<GetMeResponse>=>{
  const res=await axiosAdmin.get('/user/me')
  return res.data
}
export const updateUserApi = async (
  data: FormData
): Promise<UpdateUserResponse> => {
  const res = await axiosAdmin.put<UpdateUserResponse>(
    "/user/update",
    data
  );
  return res.data;
};
