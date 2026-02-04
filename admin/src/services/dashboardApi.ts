import axiosAdmin from "../utils/axiosAdmin";
import type { DashboardOverview,ApiResponse, UserRegisterByDate, TopViewedStory} from "../types/dashboardType";
export const getTopViewedStory = (limit = 10) =>
  axiosAdmin.get<ApiResponse<TopViewedStory[]>>(
    `/dashboard/top-view-week?limit=${limit}`
  );


export const getDashboardOverview = () =>
  axiosAdmin.get<DashboardOverview>("/dashboard/overview");

export const getUserRegisterByDate = async (
  days = 7
): Promise<UserRegisterByDate[]> => {
  const res = await axiosAdmin.get<
    { _id: string; total: number }[]
  >(`/dashboard/user-register-by-date?days=${days}`);

  return res.data.map((item) => ({
    date: item._id,
    total: item.total,
  }));
};
