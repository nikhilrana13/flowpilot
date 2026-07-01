export const ConditionExecutor = async (node, context) => {
  try {
    if (!node) {
      throw new Error("Condition node is missing");
    }
    const {
      leftValue,
      operator,
      rightValue,
    } = node.data || {};

    if (
      leftValue === undefined ||
      operator === undefined ||
      rightValue === undefined
    ) {
      throw new Error("Invalid condition configuration");
    }

    let result = false;

    switch (operator) {
      case "==":
        result = leftValue == rightValue;
        break;

      case "===":
        result = leftValue === rightValue;
        break;

      case "!=":
        result = leftValue != rightValue;
        break;

      case "!==":
        result = leftValue !== rightValue;
        break;

      case ">":
        result = leftValue > rightValue;
        break;

      case "<":
        result = leftValue < rightValue;
        break;

      case ">=":
        result = leftValue >= rightValue;
        break;

      case "<=":
        result = leftValue <= rightValue;
        break;

      default:
        throw new Error("Unsupported operator");
    }

    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      output: result,
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