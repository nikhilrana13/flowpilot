"use client";

import { ArrowLeftCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CreateWorkflowPage = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId;

  return (
    <div className="flex flex-col gap-6 px-4 py-7 md:px-10">
      <div className="rounded-3xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-4 py-2">
          <ArrowLeftCircle className="h-4 w-4 text-[#7C3AED]" />
          <Link
            href={`/dashboard/workspaces/${workspaceId}`}
            className="text-sm font-medium text-[#C4B5FD]"
          >
            Back to workspace
          </Link>
        </div>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Create a new workflow
          </h1>
          <p className="mt-3 text-[#A1A1AA]">
            Build and configure workflows for this workspace from here.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#27272A] bg-[#18181B] p-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-[#7C3AED]/30 bg-[#111114] p-8 text-center sm:items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/10 text-[#C4B5FD]">
            <PlusCircle className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Workflow builder coming soon
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#A1A1AA]">
              The workflow creation experience is being set up for this route.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkflowPage;
