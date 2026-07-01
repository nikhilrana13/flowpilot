import axios from "axios"

export const HttpExecutor = async (node, context) => {
  try {
    if (!node) {
      throw new Error("HTTP node is missing");
    }
    const {
      url,
      method = "GET",
      headers = {},
      query = {},
      body = {},
      timeout = 10000,
    } = node.data || {};

    const allowedMethods = [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ];

    if (!allowedMethods.includes(method.toUpperCase())) {
      throw new Error("Invalid HTTP method");
    }

    new URL(url);

    const response = await axios({
      url,
      method: method.toUpperCase(),
      headers,
      params: query,
      data: body,
      timeout,
      validateStatus: () => true,
    });

    return {
      success: response.status >= 200 && response.status < 300,
      nodeId: node.id,
      nodeType: node.type,
      statusCode: response.status,
      output: response.data,
      headers: response.headers,
    };

  } catch (error) {
    return {
      success: false,
      nodeId: node?.id,
      nodeType: node?.type,
      statusCode: error.response?.status || 500,
      error: error.response?.data || error.message,
    };

  }
};
