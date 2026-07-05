import User from "../models/UserModel.js";
import WorkFlow from "../models/Workflow.js";
import WorkSpace from "../models/WorkSpace.js";
import { Response } from "../utils/responseHandler.js";

export const DashboardStats = async (req, res) => {
  try {
    const userId = req.user;
    // check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    // stats card
    const [
      activeWorkspaces,
      publishedWorkflows,
      draftWorkflows,
      totalWorkflows,
    ] = await Promise.all([
      WorkSpace.countDocuments({ userId }),
      WorkFlow.countDocuments({ userId, status: "published" }),
      WorkFlow.countDocuments({ userId, status: "draft" }),
      WorkFlow.countDocuments({ userId }),
    ]);
    // recent work flows
    const recentWorkflows = await WorkFlow.find({ userId }).select("name status executionCount updatedAt ").sort({ createdAt: -1 }).limit(3).lean().populate("workspaceId", "spacename");
    return Response(res, 200, "Dashboard stats fetched successfully", {
      stats: {
        activeWorkspaces,
        publishedWorkflows,
        draftWorkflows,
        totalWorkflows,
      },
      recentWorkflows
    });
  } catch (error) {
    console.error("DashboardStats error:", error);
    return Response(res, 500, "Failed to fetch dashboard stats");
  }
};
