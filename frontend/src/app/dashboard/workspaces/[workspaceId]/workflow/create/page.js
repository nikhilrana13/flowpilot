"use client";

import { useCreateWorkflowMutation } from "@/redux/api/WorkFlowApi";
import { ArrowLeftCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateWorkflowPage = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const [CreateWorkflow, { isLoading }] = useCreateWorkflowMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const formdata = {
      name: data.name,
      description: data.description,
      workspaceId: workspaceId,
    };
    try {
      const response = await CreateWorkflow(formdata).unwrap();
      toast.success(response?.message);
      const workflow = response?.data?.workflow;
      router.replace(
        `/dashboard/workspaces/${workspaceId}/workflow/${workflow?._id}`,
      );
    } catch (error) {
      console.error("Failed to create workflow");
      toast.error(error?.data?.message || "Internal server error");
    }
  };

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
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Workflow Name */}
            <div className="flex flex-col gap-1">
              <label className="mb-2 block text-sm font-medium text-[#E4E4E7]">
                Workflow Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Lead Automation"
                className="h-12 w-full rounded-xl border border-[#2A2A33] bg-[#18181B] px-4 text-white outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                {...register("name", {
                  required: "name is Required",
                  maxLength: {
                    value: 50,
                    message: "Max 50 characters allowed",
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors?.name?.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col 1">
              <label className="mb-2 block text-sm font-medium text-[#E4E4E7]">
                Description
              </label>

              <textarea
                rows={5}
                disabled={isLoading}
                placeholder="Describe what this workflow will automate..."
                className="w-full resize-none rounded-xl border border-[#2A2A33] bg-[#18181B] px-4 py-3 text-white outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                {...register("description", {
                  maxLength: {
                    value: 300,
                    message: "Max 300 characters allowed",
                  },
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="rounded-xl border border-[#0566D9]/20 bg-[#0566D9]/10 p-4">
              <p className="text-sm text-[#BFDBFE]">
                After creating the workflow, you'll be redirected to the visual
                workflow builder where you can add triggers, actions, and logic.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,.25)] transition hover:scale-[1.02]"
              >
                {isLoading ? "please wait..." : "Create Workflow"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkflowPage;
