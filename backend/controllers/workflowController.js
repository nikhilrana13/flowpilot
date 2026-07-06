import User from "../models/UserModel.js";
import WorkFlow from "../models/Workflow.js";
import WorkSpace from "../models/WorkSpace.js";
import { Response } from "../utils/responseHandler.js";
import { nanoid } from "nanoid";

// create work flow
export const CreateWorkflow = async (req, res) => {
  try {
    const userId = req.user;
    const { name, description, workspaceId } = req.body;
    // console.log("req.body",req.body)
    // validation
    const requiredFields = ["name", "workspaceId"];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        return Response(res, 400, `${field} is required`);
      }
    }
    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    // check workspace exists
    const workspace = await WorkSpace.findOne({
      _id: workspaceId,
      userId: user._id,
    });
    if (!workspace) {
      return Response(res, 404, "Workspace not exists");
    }
    // check workflow already exists or not
    const existingWorkflow = await WorkFlow.findOne({
      workspaceId,
      name: name.trim(),
    });
    if (existingWorkflow) {
      return Response(res, 409, "Workflow already exists.");
    }
    // create workflow
    const workflow = await WorkFlow.create({
      userId: user._id,
      workspaceId: workspace._id,
      description,
      name: name.trim(),
      nodes: [],
      edges: [],
    });
    return Response(res, 201, "Workflow created successfulky", { workflow });
  } catch (error) {
    console.error("Failed to create workflow", error);
    return Response(res, 500, "Internal server error");
  }
};
// get user workflows
export const GetUserWorkflows = async (req, res) => {
  try {
    const userId = req.user;
    const { workspaceId } = req.query;
    if (!workspaceId) {
      return Response(res, 400, "Workspace ID is required");
    }
    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    const workspace = await WorkSpace.findOne({
      _id: workspaceId,
      userId,
    });

    if (!workspace) {
      return Response(res, 404, "Workspace not found");
    }
    // Get user workflows
    const workflows = await WorkFlow.find({ userId, workspaceId })
      .select("name description status executionCount lastExecutedAt createdAt")
      .sort({ createdAt: -1 })
      .lean();
    return Response(res, 200, "Workflows fetched successfully", { workflows });
  } catch (error) {
    console.error("Failed to get workflows", error);
    return Response(res, 500, "Internal server error");
  }
};
// each workflow details
export const EachWorkflowDetails = async (req, res) => {
  try {
    const userId = req.user;
    const workflowId = req.params.id;

    if (!workflowId) {
      return Response(res, 400, "Workflow ID is required");
    }
    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    const workflow = await WorkFlow.findOne({
      _id: workflowId,
      userId: user._id,
    }).lean();
    if (!workflow) {
      return Response(res, 404, "Workflow not found");
    }
    return Response(res, 200, "Workflow details", { workflow });
  } catch (error) {
    console.error("Failed to get workflow detail", error);
    return Response(res, 500, "Internal server error");
  }
};
// update workflow
export const UpdateWorkflow = async (req, res) => {
  try {
    const userId = req.user;
    const workflowId = req.params.id;
    const { name, description, nodes, edges } = req.body;

    // Validation
    const requiredFields = ["name", "nodes", "edges"];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        return Response(res, 400, `${field} is required`);
      }
    }
    if (!Array.isArray(nodes)) {
      return Response(res, 400, "Nodes must be an array");
    }
    if (!Array.isArray(edges)) {
      return Response(res, 400, "Edges must be an array");
    }
    // Find workflow
    const workflow = await WorkFlow.findOne({
      _id: workflowId,
      userId,
    });
    if (!workflow) {
      return Response(res, 404, "Workflow not found");
    }
    // Trigger validation
    const hasTrigger = nodes.some(
      (node) => node.type === "manual" || node.type === "webhook",
    );
    if (!hasTrigger) {
      return Response(
        res,
        400,
        "Workflow must contain at least one trigger node.",
      );
    }
    // Allowed node validation
    const allowedNodeTypes = [
      "manual",
      "webhook",
      "http",
      "condition",
      "gemini",
      "response",
    ];

    const invalidNode = nodes.find(
      (node) => !allowedNodeTypes.includes(node.type),
    );

    if (invalidNode) {
      return Response(res, 400, "Invalid node type.");
    }

    // Duplicate name check
    const existingWorkflow = await WorkFlow.findOne({
      workspaceId: workflow.workspaceId,
      name: name.trim(),
      _id: { $ne: workflowId },
    });

    if (existingWorkflow) {
      return Response(res, 409, "Workflow name already exists.");
    }
    // Update
    workflow.name = name.trim();
    workflow.description = description?.trim() || "";
    workflow.nodes = nodes;
    workflow.edges = edges;
    await workflow.save();
    return Response(res, 200, "Workflow updated successfully", { workflow });
  } catch (error) {
    console.error("Failed to update workflow", error);
    return Response(res, 500, "Internal server error");
  }
};
// delete workflow
export const DeleteWorkflow = async (req, res) => {
  try {
    const userId = req.user;
    const workflowId = req.params.id;
    // Validate
    if (!workflowId) {
      return Response(res, 400, "Workflow ID is required");
    }
    // Find workflow
    const workflow = await WorkFlow.findOne({
      _id: workflowId,
      userId,
    });
    if (!workflow) {
      return Response(res, 404, "Workflow not found");
    }
    const executions = await Execution.find({ workflowId }).select("_id");
    const executionIds = executions.map((execution) => execution._id);
    await ExecutionLog.deleteMany({
      executionId: { $in: executionIds },
    });

    await Execution.deleteMany({
      workflowId,
    });

    await WorkFlow.findByIdAndDelete(workflowId);
    return Response(res, 200, "Workflow deleted successfully");
  } catch (error) {
    console.error("Failed to delete workflow", error);

    return Response(res, 500, "Internal server error");
  }
};
// publish workflow
export const PublishedWorkflow = async (req, res) => {
  try {
    const userId = req.user;
    const workflowId = req.params.id;
    const { nodes, edges } = req.body;

    // nodes must be an array
    if (!Array.isArray(nodes)) {
      return Response(res, 400, "Nodes must be an array");
    }
    // edges must be an array
    if (!Array.isArray(edges)) {
      return Response(res, 400, "Edges must be an array");
    }

    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    // check workflow exists or not
    const workflow = await WorkFlow.findOne({
      _id: workflowId,
      userId,
    });
    if (!workflow) {
      return Response(res, 404, "Workflow not found");
    }
    const hasTrigger = nodes.some(
      (node) => node.type === "manual" || node.type === "webhook",
    );
    if (!hasTrigger) {
      return Response(
        res,
        400,
        "Workflow must contain at least one trigger node.",
      );
    }
    // check node type
    const allowedNodeTypes = [
      "manual",
      "webhook",
      "http",
      "condition",
      "gemini",
      "response",
    ];
    const invalidNode = nodes.find(
      (node) => !allowedNodeTypes.includes(node.type),
    );
    if (invalidNode) {
      return Response(res, 400, "Invalid node type.");
    }
    if (workflow.status === "published") {
      return Response(res, 409, "Workflow already published");
    }
    if (nodes.length < 2) {
      return Response(
        res,
        400,
        "Workflow must contain at least one action node before publishing.",
      );
    }
    if (edges.length === 0) {
    return Response(
        res,
        400,
        "Workflow must contain at least one connection."
    );
}
    
    // generate webhook
    if (!workflow.webhookId) {
      workflow.webhookId = `wf_${nanoid(10)}`;
    }
    workflow.status = "published";
    workflow.nodes = nodes;
    workflow.edges = edges;
    await workflow.save();
    return Response(res, 200, "Workflow published successfully", {
      webhookUrl: `${process.env.BASE_URL}/webhooks/${workflow.webhookId}`,
    });
  } catch (error) {
    console.error("Failed to publish workflow", error);
    return Response(res, 500, "Internal server error");
  }
};
