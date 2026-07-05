import {
  Clock3,
  MoreHorizontal,
  Play,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { formatTimeAgo } from "@/utils/Helpers";

const WorkflowCard = ({
  workflow,
  workspaceId,
}) => {
  return (
    <Link
      href={`/dashboard/workspaces/${workspaceId}/workflow/${workflow._id}`}
      className="group block rounded-2xl border border-white/10 bg-[#161022] p-5 transition-all duration-300 hover:border-violet-500/40 hover:bg-[#1A1329] hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15">
            <Workflow className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {workflow.name}
            </h3>

            <span
              className={clsx(
                "mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium",
                workflow.status === "published"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-yellow-500/15 text-yellow-400"
              )}
            >
              {workflow.status}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="mt-5 line-clamp-2 text-sm text-zinc-400">
        {workflow.description || "No description available."}
      </p>

      <div className="my-5 border-t border-white/10" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Clock3 size={16} />
          Updated {formatTimeAgo(workflow.updatedAt)}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-violet-500/30 px-4 py-2 text-sm font-medium text-violet-300 transition group-hover:bg-violet-500 group-hover:text-white">
          <Play size={16} />
          Open
        </div>
      </div>
    </Link>
  );
};

export default WorkflowCard;