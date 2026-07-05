import Link from "next/link";
import { Plus, Workflow } from "lucide-react";

const EmptyWorkflow = ({ workspaceId }) => {
  return (
    <div className="flex min-h-[450px] items-center justify-center rounded-3xl border border-dashed border-[#2A2A33] bg-[#18181B] px-6">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#0566D9]/20">
          <Workflow className="h-10 w-10 text-[#8B5CF6]" />
        </div>
        {/* Heading */}
        <h2 className="mt-8 text-2xl font-bold text-white">
          No workflows yet
        </h2>
        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          This workspace doesn't have any workflows yet.
          Create your first automation and start building powerful workflows.
        </p>
        {/* CTA */}
        <Link
          href={`/dashboard/workspaces/${workspaceId}/workflow/create`}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03]"
        >
          <Plus className="h-4 w-4" />
          Create Workflow
        </Link>
      </div>
    </div>
  );
};

export default EmptyWorkflow;