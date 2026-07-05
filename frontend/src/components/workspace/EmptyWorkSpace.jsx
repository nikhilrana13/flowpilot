import Link from "next/link";
import { FolderKanban, Plus } from "lucide-react";

const EmptyWorkspace = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#27272A] bg-[#18181B] px-8 py-16">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7C3AED]/20 to-[#0566D9]/20">
          <FolderKanban className="h-10 w-10 text-[#7C3AED]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">
          No Workspaces Yet
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-md text-[#A1A1AA] leading-7">
          Organize your automation projects into workspaces. Create your
          first workspace to start building and managing workflows.
        </p>

        {/* Button */}
        <Link
          href="/dashboard/workspaces/create"
          className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-6 py-4 font-semibold text-white transition hover:scale-[1.02]"
        >
          <Plus className="h-5 w-5" />
          Create Workspace
        </Link>
      </div>
    </div>
  );
};

export default EmptyWorkspace;