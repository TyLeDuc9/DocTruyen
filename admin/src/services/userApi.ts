import axiosAdmin from "../utils/axiosAdmin";
import type {
  GetAllUsersResponse,
  GetUserParams,
  BlockUserResponse,
} from "../types/userType";

export const deleteUserApi = async (id: string) => {
  const res = await axiosAdmin.delete(`/user/delete/${id}`);
  return res.data;
};

export const unblokedUserApi = async (
  id: string,
): Promise<BlockUserResponse> => {
  const res = await axiosAdmin.put<BlockUserResponse>(`/user/unblock/${id}`);
  return res.data;
};
export const blockUserApi = async (id: string): Promise<BlockUserResponse> => {
  const res = await axiosAdmin.put<BlockUserResponse>(`/user/block/${id}`);
  return res.data;
};
export const getAllUsersApi = async (
  params: GetUserParams,
): Promise<GetAllUsersResponse> => {
  const res = await axiosAdmin.get<GetAllUsersResponse>("user/all", {
    params,
  });
  return res.data;
};
