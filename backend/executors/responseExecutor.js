export const ResponseExecutor = async (node, context) => {
  try {
    if (!node) {
      throw new Error("Response node is missing");
    }
    const { sourceNodeId } = node.data || {};
    const output = sourceNodeId ? context.outputs[sourceNodeId] : Object.values(context.outputs).at(-1);
    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      output
    };
  } catch (error) {
    return {
      success: false,
      nodeId: node?.id,
      nodeType: node?.type,
      error: error.message,
    };
  }
};

