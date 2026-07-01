import Execution from "../models/Execution.js";
import ExecutionLog from "../models/ExecutionLog.js";
import User from "../models/UserModel.js";
import WorkFlow from "../models/Workflow.js";
import { Execute } from "../services/executionService.js";
import { Response } from "../utils/responseHandler.js";

// manully execute
export const ExecuteWorkflow = async (req, res) => {
  try {
    const userId = req.user;
    const workflowId = req.params.id;

    // Check user exists
    const user = await User.findById(userId);

    if (!user) {
      return Response(res, 401, "User not found");
    }

    // Check workflow
    const workflow = await WorkFlow.findOne({
      _id: workflowId,
      userId,
    });

    if (!workflow) {
      return Response(res, 404, "Workflow not found");
    }

    if (workflow.status !== "published") {
      return Response(res, 409, "Workflow is not published");
    }

    // Create execution
    const execution = await Execution.create({
      workflowId: workflow._id,
      status: "running",
      startedAt: new Date(),
    });
    // Execute workflow
    const result = await Execute({
      workflow,
      execution,
      payload: req.body || {},
    });
    // Update workflow stats
    await WorkFlow.findByIdAndUpdate(workflow._id, {
      $inc: {
        executionCount: 1,
      },
      $set: {
        lastExecutedAt: new Date(),
      },
    });

    return Response(res, 200, "Workflow executed successfully", {
      executionId: execution._id,
      status: execution.status,
      result: result.context.outputs,
    });
  } catch (error) {
    console.error("Failed to execute workflow", error);
    return Response(res, 500, error.message || "Internal server error");
  }
};
// webhook execute
export const ExecuteWebhook = async (req, res) => {
  try {
    const { webhookId } = req.params;
    // Find workflow
    const workflow = await WorkFlow.findOne({
      webhookId,
      status: "published",
    });
    if (!workflow) {
      return Response(res, 404, "Webhook not found");
    }
    // Create execution
    const execution = await Execution.create({
      workflowId: workflow._id,
      status: "running",
      triggerType: "webhook",
      startedAt: new Date(),
    });
    // Execute workflow
    const result = await Execute({
      workflow,
      execution,
      payload: req.body || {},
    });
    // Update stats
    await WorkFlow.findByIdAndUpdate(workflow._id, {
      $inc: {
        executionCount: 1,
      },
      $set: {
        lastExecutedAt: new Date(),
      },
    });
    return Response(res, 200, "Webhook executed successfully", {
      executionId: execution._id,
      status: execution.status,
      result: result.context.outputs,
    });
  } catch (error) {
    console.error("Webhook execution failed", error);
    return Response(res, 500, error.message || "Internal server error");
  }
};
// get executions
export const GetExecutions = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    const workflowIds = await WorkFlow.find({ userId }).distinct("_id");
    if (workflowIds.length === 0) {
      return Response(res, 200, "Executions fetched successfully", {
        executions: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalExecutions: 0,
          limit,
        },
      });
    }
    const executions = await Execution.find({workflowId: {$in: workflowIds,},}).populate("workflowId", "name status")
      .sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const totalExecutions = await Execution.countDocuments({
      workflowId: {
        $in: workflowIds,
      },
    });
    const totalPages = Math.ceil(totalExecutions / limit);
    return Response(res, 200, "Executions fetched successfully", {
      executions,
      pagination: {
        currentPage: page,
        totalPages,
        totalExecutions,
        limit,
      },
    });
  } catch (error) {
    console.error("Failed to fetch executions", error);
    return Response(res, 500, "Internal server error");
  }
};

export const GetExecutionDetails = async (req, res) => {
  try {
    const userId = req.user;
    const executionId = req.params.id;
    if (!executionId) {
      return Response(res, 400, "Execution ID is required");
    }
    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    // Find execution
    const execution = await Execution.findById(executionId).populate({
      path: "workflowId",
      match: { userId },
      select: "name status webhookId",
    });
    if (!execution || !execution.workflowId) {
      return Response(res, 404, "Execution not found");
    }

    // Get execution logs
    const logs = await ExecutionLog.find({ executionId }).sort({
      createdAt: 1,
    });
    return Response(res, 200, "Execution details fetched successfully", {
      execution,
      logs,
    });
  } catch (error) {
    console.error("Failed to fetch execution details", error);
    return Response(res, 500, "Internal server error");
  }
};
