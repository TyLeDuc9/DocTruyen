import type {
  Follow,
  FollowCreateRequest,
  FollowMeResponse,
  FollowDeleteResponse,
} from "../../types/followType";
import axiosInstance from "../../utils/axiosInstance";
export const deleteFollowApi = async (
  storyId: string
): Promise<FollowDeleteResponse> => {
  const res = await axiosInstance.delete(`/follow/${storyId}`);
  return res.data;
};

export const getFollowMeApi = async (): Promise<FollowMeResponse> => {
  const res = await axiosInstance.get("/follow/me");
  return res.data;
};

export const createFollowApi = async (
  data: FollowCreateRequest
): Promise<Follow> => {
  const res = await axiosInstance.post("/follow/create", data);
  return res.data;
};
