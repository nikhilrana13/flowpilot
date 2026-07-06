import {
  MousePointerClick,
  Webhook,
  Globe,
  GitBranch,
  Sparkles,
  Reply,
} from "lucide-react";

export const NODE_TYPES = [
  {
    type: "manual",
    title: "Manual Trigger",
    description: "Run manually",
    icon: MousePointerClick,
    color: "#10B981",
  },
  {
    type: "webhook",
    title: "Webhook",
    description: "Trigger via webhook",
    icon: Webhook,
    color: "#3B82F6",
  },
  {
    type: "http",
    title: "HTTP Request",
    description: "Call any API",
    icon: Globe,
    color: "#F59E0B",
  },
//   {
//     type: "condition",
//     title: "Condition",
//     description: "If / Else logic",
//     icon: GitBranch,
//     color: "#EF4444",
//   },
  {
    type: "gemini",
    title: "Gemini AI",
    description: "Generate AI response",
    icon: Sparkles,
    color: "#8B5CF6",
  },
  {
    type: "response",
    title: "Response",
    description: "Return output",
    icon: Reply,
    color: "#06B6D4",
  },
];

export const NODE_LABELS = {
  manual: "Manual Trigger",
  webhook: "Webhook Trigger",
  http: "HTTP Request",
  condition: "Condition",
  gemini: "Gemini AI",
  response: "Response",
};