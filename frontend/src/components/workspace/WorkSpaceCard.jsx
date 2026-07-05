import Link from "next/link";
import {
  ArrowRight,
  FolderKanban,
  Clock3,
  Workflow,
  FileClock,
  MoreVertical,
} from "lucide-react";
import { formatTimeAgo } from "@/utils/Helpers";


const WorkspaceCard = ({ workspace }) => {
    console.log()
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-6 transition-all duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_0_40px_rgba(124,58,237,.12)]">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#7C3AED]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED]">
            <FolderKanban size={28} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {workspace.spacename}
            </h3>
          </div>
        </div>

        <button className="rounded-lg p-2 text-[#71717A] transition hover:bg-[#232329] hover:text-white">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-[#27272A] pt-5">
        <div className="flex items-center gap-2 text-sm text-[#71717A]">
          <Clock3 size={15} />
          {formatTimeAgo(workspace.updatedAt)}
        </div>

        <Link
          href={`/dashboard/workspaces/${workspace._id}`}
          className="group/link flex items-center gap-2 font-medium text-[#7C3AED]"
        >
          Open Workspace

          <ArrowRight
            size={17}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceCard;