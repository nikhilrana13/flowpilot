"use client"
import { getSocket } from "@/config/socket";
import { useExecuteWorkflowMutation } from "@/redux/api/ExecutionApi";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



export const ExecutionContext = createContext()

export const ExecutionProvider = ({ children }) => {
    const [executionDialogOpen, setExecutionDialogOpen] = useState(false)
    const [executionId, setExecutionId] = useState(null)
    const [steps, setSteps] = useState([]);
    const [result, setResult] = useState(null);
    const [executionError, setExecutionError] = useState(null);
    const [status, setStatus] = useState("idle")
    const [ExecuteWorkflow, { isLoading }] = useExecuteWorkflowMutation()
    const isExecuting = isLoading
    const executionIdRef = useRef(null);


    useEffect(() => {
        executionIdRef.current = executionId;
    }, [executionId]);

    useEffect(() => {
        const socket = getSocket()
        // execution started
        socket.on("execution-started", (data) => {
            setExecutionDialogOpen(true)
            setExecutionId(data.executionId)
            setStatus("running")
            setSteps([])
            setResult(null)
            setExecutionError(null)
        })
        // execution step
        socket.on("execution-step", (step) => {
            if (step.executionId !== executionIdRef.current) return;
            setSteps(prev => {
                const exists = prev.find(
                    x => x.node.id === step.node.id
                );
                if (exists) {
                    return prev.map(x =>
                        x.node.id === step.node.id
                            ? step
                            : x
                    );
                }
                return [...prev, step];
            });
        });
        // execution completed 
        socket.on("execution-completed", (data) => {
            if (data.executionId !== executionIdRef.current) return;
            setStatus("completed");
            setResult(data.result);
        });
        // execution failed
        socket.on("execution-failed", (data) => {
            if (data.executionId !== executionIdRef.current) return;
            setExecutionDialogOpen(true);
            setStatus("failed");
            setExecutionError(data.error);
        });
        return () => {
            socket.off("execution-started");
            socket.off("execution-step");
            socket.off("execution-completed");
            socket.off("execution-failed");
        }
    }, [])
    const resetExecution = () => {
        executionIdRef.current = null;
        setExecutionDialogOpen(false);
        setExecutionId(null);
        setSteps([]);
        setResult(null);
        setExecutionError(null);
        setStatus("idle");
    };
    const handleExecuteWorkflow = async (id) => {
        try {
            const response = await ExecuteWorkflow(id).unwrap()
            toast.success(response?.message)
        } catch (error) {
            console.error("failed to execute workflow", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <ExecutionContext.Provider value={{ executionDialogOpen, setExecutionDialogOpen, handleExecuteWorkflow, executionId, status, isExecuting, result, executionError, steps,resetExecution}}>
            {children}
        </ExecutionContext.Provider>
    )
}

export const useExecutionContext = () => useContext(ExecutionContext)