

export const WebhookExecutor = async(node,context)=>{
    try {
    if (!node) {
      throw new Error("Webhook trigger node is missing");
    }
    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      output: context.payload || {},
    };
  } catch (error) {
    return {
      success: false,
      nodeId: node?.id,
      nodeType: node?.type,
      error: error.message,
    };
  }
}

