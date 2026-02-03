import axiosInstance from "../utils/axiosInstance";
import { API } from "../config/api";
import type { GetNotificationsResponse } from "../types/notifyType";

const API_NOTIFY = `${API}/notify`;

export const getNotificationsByUser = async (
  userId: string,
  page = 1,
  limit = 20
) => {
  const res = await axiosInstance.get<GetNotificationsResponse>(
    `${API_NOTIFY}/${userId}`,
    {
      params: { page, limit },
    }
  );

  return res.data;
};
