"use client";
import FlowCanvas from "@/components/workflow-builder/FlowCanvas";
import NodeConfig from "@/components/workflow-builder/NodeConfig";
import NodeSidebar from "@/components/workflow-builder/NodeSidebar";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

const page = () => {
  return (
    <ReactFlowProvider>
      <div className="flex h-full">
        {/* node sidebar */}
        <NodeSidebar />
        {/* flow canvas */}
        <div className="flex-1 h-full">
          <FlowCanvas />
        </div>
        {/* node config */}
        <NodeConfig />
      </div>
    </ReactFlowProvider>
  );
};

export default page;
