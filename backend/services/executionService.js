import { executors } from "../executors/executorindex.js";
import ExecutionLog from "../models/ExecutionLog.js";

export const Execute = async ({ workflow, execution, payload = {} }) => {
  const visitedNodes = new Set();
  try {
    // Validation
    if (!workflow) {
      throw new Error("Workflow not found");
    }
    if (!Array.isArray(workflow.nodes)) {
      throw new Error("Invalid workflow nodes");
    }
    if (!Array.isArray(workflow.edges)) {
      throw new Error("Invalid workflow edges");
    }
    // Context
    const context = {
      payload,
      outputs: {},
      executionId: execution._id,
    };
    // Find Trigger
    const triggerNode = workflow.nodes.find(
      (node) => node.type === "manual" || node.type === "webhook"
    );
    if (!triggerNode) {
      throw new Error("Trigger node not found");
    }
    let currentNode = triggerNode;
    // Execute Workflow
    while (currentNode) {
      // Prevent infinite loop
      if (visitedNodes.has(currentNode.id)) {
        throw new Error("Circular workflow detected");
      }
      visitedNodes.add(currentNode.id);
      const executor = executors[currentNode.type];
      if (!executor) {
        throw new Error(
          `No executor found for node type: ${currentNode.type}`
        );
      }
      const nodeStartedAt = new Date();
      const result = await executor(currentNode, context);
      console.log(result);
      const nodeEndedAt = new Date();
      // Save node output
      context.outputs[currentNode.id] = result.output;
      // Save execution log
      await ExecutionLog.create({
        executionId: execution._id,
        nodeId: currentNode.id,
        nodeType: currentNode.type,
        status: result.success ? "completed" : "failed",
        startedAt: nodeStartedAt,
        endedAt: nodeEndedAt,
        input: JSON.stringify(currentNode.data || {}),
        output: JSON.stringify(result.output || {}),
        error: result.error || null,
      });
      if (!result.success) {
        throw new Error(result.error || "Node execution failed");
      }
      // Next Node
      const nextEdge = workflow.edges.find(
        (edge) => edge.source === currentNode.id
      );
      if (!nextEdge) {
        break;
      }
      currentNode = workflow.nodes.find(
        (node) => node.id === nextEdge.target
      );
      if (!currentNode) {
        throw new Error("Next node not found");
      }
    }
    // Complete Execution
    execution.status = "completed";
    execution.endedAt = new Date();
    execution.duration = execution.endedAt.getTime() - execution.startedAt.getTime();
    await execution.save();
    return {
      success: true,
      context,
    };
  } catch (error) {
    if (execution) {
      execution.status = "failed";
      execution.error = error.message;
      execution.endedAt = new Date();
      execution.duration =
      execution.endedAt.getTime() - execution.startedAt.getTime();
      await execution.save();
    }
    throw error;
  }
};
