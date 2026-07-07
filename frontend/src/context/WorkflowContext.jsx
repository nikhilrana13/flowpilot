import { useEdgesState, useNodesState } from "@xyflow/react";
import { createContext, useContext, useEffect, useState } from "react";





export const WorkflowContext = createContext()

export const WorkflowContextProvider = ({ children, workflow }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(null)



    useEffect(() => {
        if (!workflow) return;
        setNodes(workflow?.nodes || [])
        setEdges(workflow?.edges || [])
    }, [workflow])

    return (
        <WorkflowContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, selectedNodeId, setSelectedNodeId }}>
            {children}
        </WorkflowContext.Provider>
    )
}

export const useWorkflowContext = () => useContext(WorkflowContext)