import { executors } from "../executors/executorIndex.js";
import ExecutionLog from "../models/ExecutionLog.js";
import { emitExecutionStep } from "../utils/emitExecutionStep.js";

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
      (node) => node.type === "manual" || node.type === "webhook",
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
        throw new Error(`No executor found for node type: ${currentNode.type}`);
      }
      const nodeStartedAt = new Date();
      // socket running event
      await emitExecutionStep({
        userId: workflow.userId,
        executionId: execution._id,
        node: currentNode,
        status: "running",
        startedAt: nodeStartedAt,
      });
      let result;

      try {
        result = await executor(currentNode, context);
        // console.log(result);
      } catch (error) {
        const nodeEndedAt = new Date();
        // failed event
        await emitExecutionStep({
          userId: workflow.userId,
          executionId: execution._id,
          node: currentNode,
          status: "failed",
          error: error.message,
          startedAt: nodeStartedAt,
          completedAt: nodeEndedAt,
        });
         //  create execution
        await ExecutionLog.create({
        executionId: execution._id,
        nodeId: currentNode.id,
        nodeType: currentNode.type,
        status:"failed",
        startedAt: nodeStartedAt,
        endedAt: nodeEndedAt,
        input: JSON.stringify(currentNode.data || {}),
        output:null,
        error: error.message || null,
      });
        throw error
      }
      const nodeEndedAt = new Date();
      // Save node output
      context.outputs[currentNode.id] = result.output;
      
      if (!result.success) {
        // failed event
        await emitExecutionStep({
          userId: workflow.userId,
          executionId: execution._id,
          node: currentNode,
          status: "failed",
          error: result.error,
          startedAt: nodeStartedAt,
          completedAt: nodeEndedAt,
        });
         //  create execution
        await ExecutionLog.create({
        executionId: execution._id,
        nodeId: currentNode.id,
        nodeType: currentNode.type,
        status:"failed",
        startedAt: nodeStartedAt,
        endedAt: nodeEndedAt,
        input: JSON.stringify(currentNode.data || {}),
        output:result.output ? typeof result.output === "string" ? result.output : JSON.stringify(result.output) : null,
        error: result.error || null,
      });
        throw new Error(result.error || "Node execution failed");
      }
      // complete event
      await emitExecutionStep({
        userId: workflow.userId,
        executionId: execution._id,
        node: currentNode,
        status: "completed",
        output: result.output,
        startedAt: nodeStartedAt,
        completedAt: nodeEndedAt,
      });
      // Save execution log
      await ExecutionLog.create({
        executionId: execution._id,
        nodeId: currentNode.id,
        nodeType: currentNode.type,
        status: result.success ? "completed" : "failed",
        startedAt: nodeStartedAt,
        endedAt: nodeEndedAt,
        input: JSON.stringify(currentNode.data || {}),
        output:
          typeof result.output === "string"
            ? result.output
            : JSON.stringify(result.output),
        error: result.error || null,
      });

      // Next Node
      const nextEdge = workflow.edges.find(
        (edge) => edge.source === currentNode.id,
      );
      if (!nextEdge) {
        break;
      }
      currentNode = workflow.nodes.find((node) => node.id === nextEdge.target);
      if (!currentNode) {
        throw new Error("Next node not found");
      }
    }
    // Complete Execution
    execution.status = "completed";
    execution.endedAt = new Date();
    execution.duration =
      execution.endedAt.getTime() - execution.startedAt.getTime();
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
