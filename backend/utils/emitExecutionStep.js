import { GetIo } from "../config/socket.js";


export const emitExecutionStep = ({userId,executionId,node,status,output = null,error = null,startedAt = null,completedAt = null,
}) => {
  try {
    const io = GetIo();
    if (!userId || !executionId || !node) return;
    io.to(`user-${userId}`).emit("execution-step", {
      executionId,
      node: {
        id: node.id,
        type: node.type,
        label: node.data?.label || node.type,
      },
      status,
      output,
      error,
      startedAt,
      completedAt,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to emit execution step", err);
  }
};

export const EXECUTION_STATUS = {
  PENDING: "pending",
  RUNNING: "running",
  COMPLETED: "completed",
  FAILED: "failed",
  SKIPPED: "skipped",
};