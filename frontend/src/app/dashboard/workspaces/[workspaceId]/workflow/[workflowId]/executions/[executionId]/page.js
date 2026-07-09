"use client";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MousePointerClick,
  Webhook,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import OutputRenderer from "@/components/execution/OutputRenderer";
import { useGetExecutionDetailsQuery } from "@/redux/api/ExecutionApi";
import { useParams } from "next/navigation";
import React from "react";
import ExecutionDetailsShimmer from "@/components/execution/ExecutionDetailShimmer";

const page = () => {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const workflowId = params.workflowId;
  const executionId = params.executionId;
  const { data, isLoading, isError } = useGetExecutionDetailsQuery(executionId);
  const execution = data?.data?.execution || {};
  const logs = data?.data?.logs || [];
  console.log("logs", logs);

  if (isLoading) {
    return (
      <ExecutionDetailsShimmer />
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F13] text-red-400">
        Failed to load execution.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F13] p-8">
      <Link
        href={`/dashboard/workspaces/${workspaceId}/workflow/${workflowId}/executions`}
        className="mb-8 inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Executions
      </Link>
      <div className="rounded-3xl border border-[#27272A] bg-[#18181B] p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-3xl font-bold text-white">Execution Details</h1>
            <p className="mt-3 text-[#71717A] break-all">{execution._id}</p>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              execution.status === "completed"
                ? "bg-emerald-500/10 text-emerald-400"
                : execution.status === "failed"
                  ? "bg-red-500/10 text-red-400"
                  : "bg-[#7C3AED]/10 text-[#7C3AED]"
            }`}
          >
            {execution.status}
          </span>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-[#111114] p-5">
            <p className="text-sm text-[#71717A]">Trigger</p>
            <div className="mt-3 flex items-center gap-2 text-white">
              {execution.triggerType === "manual" ? (
                <MousePointerClick size={18} />
              ) : (
                <Webhook size={18} />
              )}

              {execution.triggerType}
            </div>
          </div>

          <div className="rounded-2xl bg-[#111114] p-5">
            <p className="text-sm text-[#71717A]">Duration</p>

            <h3 className="mt-3 text-xl font-semibold text-white">
              {execution.duration} ms
            </h3>
          </div>

          <div className="rounded-2xl bg-[#111114] p-5">
            <p className="text-sm text-[#71717A]">Started</p>

            <p className="mt-3 text-white">
              {new Date(execution.startedAt).toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl bg-[#111114] p-5">
            <p className="text-sm text-[#71717A]">Ended</p>

            <p className="mt-3 text-white">
              {execution.endedAt
                ? new Date(execution.endedAt).toLocaleString()
                : "--"}
            </p>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-[#27272A] bg-[#111114] p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Execution Timeline
          </h2>
          <div className="space-y-4">
            {logs?.map((log) => (
              <div
                key={log._id}
                className="rounded-xl border border-[#27272A] bg-[#18181B]"
              >
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-white capitalize">
                      {log.nodeType}
                    </h3>

                    <p className="mt-1 text-xs text-[#71717A]">
                      {new Date(log.startedAt).toLocaleTimeString()}
                    </p>
                  </div>

                  {log.status === "completed" && (
                    <CheckCircle2 className="text-emerald-400" />
                  )}

                  {log.status === "failed" && (
                    <XCircle className="text-red-400" />
                  )}

                  {log.status === "running" && (
                    <Clock3 className="text-[#7C3AED]" />
                  )}
                </div>

                {/* Output */}

                {log.output && (
                  <div className="border-t border-[#27272A] p-4">
                    <p className="mb-3 text-sm font-medium text-emerald-400">
                      Output
                    </p>

                    <OutputRenderer data={log.output} />
                  </div>
                )}

                {/* Error */}

                {log.error && (
                  <div className="border-t border-[#27272A] p-4">
                    <p className="mb-3 text-sm font-medium text-red-400">
                      Error
                    </p>

                    <OutputRenderer data={log.error} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
