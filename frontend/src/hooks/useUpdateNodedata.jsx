import { useWorkflowContext } from "@/context/WorkflowContext";





const useUpdateNodeData = () => {
    const { setNodes } = useWorkflowContext();

    const handleUpdateNode = (nodeId,updates) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            ...updates,
                        },
                    }
                    : node
            )
        );
    }
    return handleUpdateNode
}

export default useUpdateNodeData