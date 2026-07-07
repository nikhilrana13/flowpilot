import { formatDistanceToNowStrict } from "date-fns";

export const formatTimeAgo = (date) => {
  const result = formatDistanceToNowStrict(new Date(date));
  return (
    result
      .replace(" seconds", "s")
      .replace(" second", "s")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d")
      .replace(" months", "mo")
      .replace(" month", "mo")
      .replace(" years", "y")
      .replace(" year", "y") + " ago"
  );
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      text: "Good Morning",
      emoji: "☀️",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      text: "Good Afternoon",
      emoji: "🌤️",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      text: "Good Evening",
      emoji: "🌇",
    };
  }

  return {
    text: "Good Night",
    emoji: "🌙",
  };
};

export const isValidConnection = (source, target) => {
  // Trigger cannot come after another node
  if (target.type === "manual" || target.type === "webhook") return false;

  // Response cannot connect to anything
  if (source.type === "response") return false;

  return true;
};

export const validateWorkflow = (nodes, edges) => {
  if (!nodes || nodes.length === 0) {
    return {
      valid: false,
      message: "Workflow must contain at least one node.",
    };
  }

  // Trigger Validation
  const triggers = nodes.filter(
    (node) => node.type === "manual" || node.type === "webhook",
  );

  if (triggers.length === 0) {
    return {
      valid: false,
      message: "Workflow must contain one Trigger node.",
    };
  }

  if (triggers.length > 1) {
    return {
      valid: false,
      message: "Only one Trigger node is allowed.",
    };
  }

  // Response Validation
  const responses = nodes.filter((node) => node.type === "response");
  if (responses.length === 0) {
    return {
      valid: false,
      message: "Workflow must contain one Response node.",
    };
  }

  if (responses.length > 1) {
    return {
      valid: false,
      message: "Only one Response node is allowed.",
    };
  }

  // Trigger Incoming
  const trigger = triggers[0];

  if (edges.some((edge) => edge.target === trigger.id)) {
    return {
      valid: false,
      message: "Trigger node cannot have incoming connections.",
    };
  }
  // Response Outgoing
  const response = responses[0];

  if (edges.some((edge) => edge.source === response.id)) {
    return {
      valid: false,
      message: "Response node cannot have outgoing connections.",
    };
  }

  // Connected Graph
  if (nodes.length > 1) {
    const connected = new Set();

    edges.forEach((edge) => {
      connected.add(edge.source);
      connected.add(edge.target);
    });

    const disconnected = nodes.find((node) => !connected.has(node.id));

    if (disconnected) {
      return {
        valid: false,
        message: `${disconnected.data.label} is not connected.`,
      };
    }
  }

  // One Incoming / One Outgoing
  for (const node of nodes) {
    const incoming = edges.filter((e) => e.target === node.id);
    const outgoing = edges.filter((e) => e.source === node.id);

    switch (node.type) {
      case "manual":
      case "webhook":
        if (outgoing.length === 0) {
          return {
            valid: false,
            message: `${node.data.label} must connect to another node.`,
          };
        }

        if (outgoing.length > 1) {
          return {
            valid: false,
            message: `${node.data.label} can have only one outgoing connection.`,
          };
        }

        break;

      case "http":
      case "gemini":
        if (incoming.length !== 1) {
          return {
            valid: false,
            message: `${node.data.label} must have exactly one incoming connection.`,
          };
        }

        if (outgoing.length !== 1) {
          return {
            valid: false,
            message: `${node.data.label} must have exactly one outgoing connection.`,
          };
        }

        break;

      case "response":
        if (incoming.length !== 1) {
          return {
            valid: false,
            message: "Response node must have one incoming connection.",
          };
        }

        break;
    }
  }

  //  Cycle Detection
  const graph = {};

  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  edges.forEach((edge) => {
    graph[edge.source].push(edge.target);
  });

  const visited = new Set();
  const stack = new Set();

  const dfs = (id) => {
    if (stack.has(id)) return true;

    if (visited.has(id)) return false;

    visited.add(id);
    stack.add(id);

    for (const next of graph[id]) {
      if (dfs(next)) return true;
    }

    stack.delete(id);

    return false;
  };

  for (const node of nodes) {
    if (dfs(node.id)) {
      return {
        valid: false,
        message: "Workflow cannot contain cycles.",
      };
    }
  }
  // Node Configuration Validation
for (const node of nodes) {
  switch (node.type) {
    case "manual":
    case "webhook":
      if (!node.data?.label?.trim()) {
        return {
          valid: false,
          message: "Trigger node name is required.",
        };
      }
      break;

    case "http":
      if (!node.data?.label?.trim()) {
        return {
          valid: false,
          message: "HTTP node name is required.",
        };
      }
      if (!node.data?.url?.trim()) {
        return {
          valid: false,
          message: `${node.data.label || "HTTP node"} is missing Request URL.`,
          nodeId: node.id,
        };
      }
      if (!node.data?.method?.trim()) {
        return {
          valid: false,
          message: `${node.data.label || "HTTP node"} is missing HTTP Method.`,
          nodeId: node.id,
        };
      }

      try {
        new URL(node.data.url);
      } catch {
        return {
          valid: false,
          message: `${node.data.label || "HTTP node"} has an invalid URL.`,
          nodeId: node.id,
        };
      }

      break;

    case "gemini":
      if (!node.data?.label?.trim()) {
        return {
          valid: false,
          message: "Gemini node name is required.",
        };
      }

      if (!node.data?.prompt?.trim()) {
        return {
          valid: false,
          message: `${node.data.label || "Gemini node"} is missing Prompt.`,
          nodeId: node.id,
        };
      }

      break;

    case "response":
      if (!node.data?.label?.trim()) {
        return {
          valid: false,
          message: "Response node name is required.",
          nodeId: node.id,
        };
      }

      break;
  }
}


  return {
    valid: true,
    message: "Workflow is valid.",
  };
};
