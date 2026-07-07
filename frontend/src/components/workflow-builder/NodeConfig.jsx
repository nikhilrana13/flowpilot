"use client"
import { useWorkflowContext } from '@/context/WorkflowContext';
import React from 'react';
import EmptyNodeConfig from './EmptyNodeConfig';
import ManualForm from './forms/ManualForm';
import WebhookForm from './forms/WebhookForm';
import HttpForm from './forms/HttpForm';
import GeminiForm from './forms/GeminiForm';
import ResponseForm from './forms/ResponseForm';
import DeleteNodeButton from './nodes/DeleteNodeButton';

const NodeConfig = () => {
  const { selectedNodeId, nodes } = useWorkflowContext()
  const selectedNode = nodes.find((node) => node.id === selectedNodeId)
  // console.log("selectedNode", selectedNode)

  let FormComponent
  switch (selectedNode?.type) {
    case "manual":
      FormComponent = <ManualForm node={selectedNode} />
      break;

    case "webhook":
      FormComponent = <WebhookForm node={selectedNode} />;
      break;

    case "http":
      FormComponent = <HttpForm node={selectedNode} />;
      break;

    case "gemini":
      FormComponent = <GeminiForm node={selectedNode} />;
      break;

    case "response":
      FormComponent = <ResponseForm node={selectedNode} />;
      break;

    default:
      FormComponent = <EmptyNodeConfig />;
  }
  return (
    <div className="w-80 flex h-full border-l border-[#27272A] flex-col bg-[#18181B] ">
      <div className="border-b border-[#27272A] px-5 py-4">
        <h2 className="text-lg font-semibold text-white">
          Node Configuration
        </h2>
      </div>
      <div className="h-[calc(100%-65px)]  overflow-y-auto">
        {FormComponent}
      </div>
      {selectedNode && (
          <div className="border-t border-[#27272A] p-5">
            <DeleteNodeButton />
          </div>
        )}

    </div>
  );
}

export default NodeConfig;
