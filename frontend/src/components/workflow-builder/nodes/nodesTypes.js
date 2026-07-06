import BaseNode from "./BaseNode";

import {MousePointerClick,Webhook,Globe,Sparkles,Reply,GitBranch,} from "lucide-react";

export const nodeTypes = {
  manual: (props) => (
    <BaseNode
      {...props}
      icon={MousePointerClick}
      title="Manual Trigger"
      description="Run manually"
      color="#10B981"
      source
    />
  ),

  webhook: (props) => (
    <BaseNode
      {...props}
      icon={Webhook}
      title="Webhook"
      description="Trigger via webhook"
      color="#3B82F6"
      source
    />
  ),

  http: (props) => (
    <BaseNode
      {...props}
      icon={Globe}
      title="HTTP Request"
      description="Call any API"
      color="#F59E0B"
      source
      target
    />
  ),

  gemini: (props) => (
    <BaseNode
      {...props}
      icon={Sparkles}
      title="Gemini AI"
      description="Generate AI response"
      color="#8B5CF6"
      source
      target
    />
  ),

  response: (props) => (
    <BaseNode
      {...props}
      icon={Reply}
      title="Response"
      description="Return output"
      color="#06B6D4"
      target
    />
  ),
  // condition: (props) => (
  //   <BaseNode
  //     {...props}
  //     icon={GitBranch}
  //     title="Condition"
  //     description="If / Else"
  //     color="#EF4444"
  //     source
  //     target
  //   />
  // ),
};