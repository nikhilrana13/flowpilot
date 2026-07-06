"use client";
import WorkflowBuilderLoading from "@/components/workflow-builder/WorkflowBuilderLoading";
import WorkflowHeader from "@/components/workflow-builder/WorkflowHeader";
import { WorkflowContextProvider } from "@/context/WorkflowContext";
import { useGetWorkflowDetailsQuery } from "@/redux/api/WorkFlowApi";
import { useParams } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const params = useParams();
  const workflowId = params?.workflowId;
  const flowQuery = useGetWorkflowDetailsQuery(workflowId);
  const flowdetails = flowQuery?.data?.data?.workflow;
  const isLoading = flowQuery?.isLoading;
  const isError = flowQuery?.isError;
  // console.log("flowdetails",flowdetails)
  if (isLoading) {
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
    <WorkflowContextProvider>
      <div className="w-full h-screen overflow-hidden bg-[#0F0F13]">
        <WorkflowHeader workflow={flowdetails} />
        <main className="h-[calc(100vh-72px)]">{children}</main>
      </div>
    </WorkflowContextProvider>
  );
};

export default layout;
