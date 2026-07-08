import { DashboardApi } from "@/redux/api/DashboardApi";
import { ExecutionApi } from "@/redux/api/ExecutionApi";
import { WorkFlowApi } from "@/redux/api/WorkFlowApi";
import { WorkSpaceApi } from "@/redux/api/WorkspaceApi";



export const resetAllApiCaches = () => (dispatch) => {
  dispatch(DashboardApi.util.resetApiState());
  dispatch(ExecutionApi.util.resetApiState())
  dispatch(WorkFlowApi.util.resetApiState())
  dispatch(WorkSpaceApi.util.resetApiState())
};