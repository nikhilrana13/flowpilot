"use client";
import ExecutionDialog from "@/components/execution/ExecutionDialog";
import WorkflowBuilderLoading from "@/components/workflow-builder/WorkflowBuilderLoading";
import WorkflowHeader from "@/components/workflow-builder/WorkflowHeader";
import { ExecutionProvider, useExecutionContext } from "@/context/ExecutionContext";
import {WorkflowContextProvider,} from "@/context/WorkflowContext";
import {
  useGetWorkflowDetailsQuery} from "@/redux/api/WorkFlowApi";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const layout = ({ children }) => {
  const params = useParams();
  const workflowId = params?.workflowId;
  const flowQuery = useGetWorkflowDetailsQuery(workflowId);
  const flowdetails = flowQuery?.data?.data?.workflow;
  const flowloading = flowQuery?.isLoading;
  const isError = flowQuery?.isError;
  // console.log("flowdetails",flowdetails)

  if (flowloading) {
    return <WorkflowBuilderLoading />;
  }
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-400">Failed to load workflow.</p>
      </div>
    );
  }
  return (
    <ExecutionProvider>
       <WorkflowContextProvider workflow={flowdetails}>
      <div className="w-full h-screen overflow-hidden bg-[#0F0F13]">
        <WorkflowHeader
          workflow={flowdetails}
        />
        <ExecutionDialog />
        <main className="h-[calc(100vh-72px)]">{children}</main>
      </div>
    </WorkflowContextProvider>
    </ExecutionProvider>
   
  );
};

export default layout;
