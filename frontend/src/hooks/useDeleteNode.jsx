"use client";

import { useWorkflowContext } from "@/context/WorkflowContext";

const useDeleteNode = () => {
    const {
        setNodes,
        setEdges,
        selectedNodeId,
        setSelectedNodeId,
    } = useWorkflowContext();

    const deleteNode = () => {
        if (!selectedNodeId) return;
        setNodes((prevNodes) => {
            const remainingNodes = prevNodes.filter(
                (node) => node.id !== selectedNodeId
            );
            if (remainingNodes.length > 0) {
                setSelectedNodeId(remainingNodes[0].id);
            } else {
                setSelectedNodeId(null);
            }
            return remainingNodes;
        });
        setEdges((prevEdges) =>
            prevEdges.filter(
                (edge) =>
                    edge.source !== selectedNodeId &&
                    edge.target !== selectedNodeId
            )
        );
    };

    return deleteNode;
};

export default useDeleteNode;