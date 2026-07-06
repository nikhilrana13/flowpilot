import { useEdgesState, useNodesState } from "@xyflow/react";
import { createContext, useContext, useState } from "react";





export const WorkflowContext = createContext()

export const WorkflowContextProvider = ({ children }) => {
    const [nodes, setNodes,onNodesChange] = useNodesState([]);
    const [edges, setEdges,onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(null)

    return (
        <WorkflowContext.Provider value={{nodes,setNodes,onNodesChange,edges,setEdges,onEdgesChange,selectedNodeId, setSelectedNodeId}}>
            {children}
        </WorkflowContext.Provider>
    )
}

export const useWorkflowContext = () => useContext(WorkflowContext)