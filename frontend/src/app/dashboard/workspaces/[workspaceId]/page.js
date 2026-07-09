"use client";
import EmptyWorkflow from "@/components/workflow/EmptyWorkflow";
import WorkflowCard from "@/components/workflow/WorkflowCard";
import WorkflowCardShimmer from "@/components/workflow/WorkflowCardShimmer";
import { useGetWorkSpaceDetailsQuery } from "@/redux/api/WorkspaceApi";
import { ArrowLeftCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const spaceQuery = useGetWorkSpaceDetailsQuery(workspaceId);
  const spaceDetails = spaceQuery?.data?.data?.workspace || {};
  const workflows = spaceQuery?.data?.data?.workflows || [];
  const loading = spaceQuery?.isLoading;
  const isError = spaceQuery?.isError;

  return (
    <div className="flex flex-col gap-8 md:px-10 py-7 px-4">
      <div className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8">
        {/* Background Glow */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-[#0566D9]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-4 py-2">
              <ArrowLeftCircle className="h-4 w-4 text-[#7C3AED]" />

              <Link
                href="/dashboard/workspaces"
                className="text-sm font-medium text-[#C4B5FD]"
              >
                Back to WorkSpace
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div>
                {spaceDetails?.spacename && (
                  <h1 className="text-3xl font-bold text-white sm:text-4xl">
                    {spaceDetails?.spacename}
                  </h1>
                )}
                <p className="mt-2 max-w-xl text-[#A1A1AA]">
                  Manage all workflows inside this workspace.
                </p>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/dashboard/workspaces/${workspaceId}/workflow/create`}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-6 py-4 font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,.25)] transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="h-5 w-5 transition group-hover:rotate-90" />

              <span>Create Workflow</span>
            </Link>
          </div>
        </div>
      </div>
      {/* cards */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {[1,2,3].map((_,i)=>{
            return (
                <WorkflowCardShimmer key={i} />
            )
          })}
        </div>
      ) : workflows?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {workflows?.map((workflow) => (
            <WorkflowCard
              key={workflow?._id}
              workflow={workflow}
              workspaceId={workspaceId}
            />
          ))}
        </div>
      ) : isError ? (
        <p className="text-gray-500 text-sm text-center">
          Error loading workflows.please try again
        </p>
      ) : (
        <EmptyWorkflow workspaceId={workspaceId} />
      )}
    </div>
  );
};

export default page;
