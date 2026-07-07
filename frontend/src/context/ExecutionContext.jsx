import { useExecuteWorkflowMutation } from "@/redux/api/ExecutionApi";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";



export const ExecutionContext = createContext()

export const ExecutionProvider = ({ children }) => {
    const [executionDialogOpen, setExecutionDialogOpen] = useState(false)
    const [executionId, setExecutionId] = useState(null)
    const [result, setResult] = useState(null);
    const [executionError, setExecutionError] = useState(null);
    const [status, setStatus] = useState("idle")
    const [ExecuteWorkflow, { isLoading }] = useExecuteWorkflowMutation()
    const isExecuting = isLoading

    const handleExecuteWorkflow = async (id) => {
        setExecutionDialogOpen(true);
        setStatus("running");
        setResult(null);
        setExecutionError(null);
        try {
            const response = await ExecuteWorkflow(id).unwrap()
            setExecutionId(response?.data?.executionId);
            setStatus(response?.data?.status);
            setResult(response?.data?.result || null);
            toast.success(response?.message)
        } catch (error) {
            console.error("failed to execute workflow", error)
            setExecutionError(error?.data || error);
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <ExecutionContext.Provider value={{ executionDialogOpen, setExecutionDialogOpen, handleExecuteWorkflow, executionId, status, isExecuting ,result,executionError}}>
            {children}
        </ExecutionContext.Provider>
    )
}

export const useExecutionContext = () => useContext(ExecutionContext)