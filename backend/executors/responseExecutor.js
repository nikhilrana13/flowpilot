export const ResponseExecutor = async (node, context) => {
  try {
    if (!node) {
      throw new Error("Response node is missing");
    }
    const { response } = node.data || {};
    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      output: response ?? context.outputs,
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

