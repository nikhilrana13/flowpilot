"use client";
import {addEdge, Background,Controls,MiniMap,ReactFlow,useEdgesState,useNodesState, useReactFlow,ConnectionLineType } from "@xyflow/react";
import { nodeTypes } from "./nodes/nodesTypes";
import { useCallback } from "react";
import { useWorkflowContext } from "@/context/WorkflowContext";
import { NODE_LABELS } from "../constants/Nodes";
import { toast } from "react-toastify";
import { isValidConnection } from "@/utils/Helpers";


const FlowCanvas = () => {
  const { screenToFlowPosition } = useReactFlow();
  const {setSelectedNodeId,onNodesChange,onEdgesChange,nodes,edges,setEdges,setNodes} = useWorkflowContext()

  const onConnect = useCallback((connection) => {
    const source = nodes.find(n => n.id === connection.source);
   const target = nodes.find(n => n.id === connection.target);

   // validate here
   if (!isValidConnection(source, target)) {
      toast.error("Invalid connection");
      return;
   }
    const alreadyExists = edges.some(
      (edge) =>
        edge.source === connection.source &&
        edge.target === connection.target
    );

    if (alreadyExists) {
      toast.error("Connection already exists.");
      return;
    }

   setEdges((eds) => addEdge(connection, eds));
}, [setEdges,nodes,edges]);

  const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

  const onDrop = (event) => {
  event.preventDefault();
  const type = event.dataTransfer.getData("application/reactflow");
  if (!type) return;
  const position = screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });
  const newNode = {
    id: `${Date.now()}`,
    type,
    position,
    data: {
      label: NODE_LABELS[type],
    },
  };
  setNodes((nds) => [...nds, newNode]);
  setSelectedNodeId(newNode.id);
  };
  // console.log("nodes",nodes)
  // console.log("edges",edges)
  const onNodeClick = (_,node)=>{
    setSelectedNodeId(node.id)
  }

  return (
    <>
       <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
}

export default FlowCanvas;
