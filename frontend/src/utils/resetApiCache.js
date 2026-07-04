import { DashboardApi } from "@/redux/api/DashboardApi";



export const resetAllApiCaches = () => (dispatch) => {
  dispatch(DashboardApi.util.resetApiState());
};