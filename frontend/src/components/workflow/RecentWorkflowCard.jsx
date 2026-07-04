import Link from "next/link";
import { ArrowUpRight, Clock3, PlayCircle } from "lucide-react";
import { formatTimeAgo } from "@/utils/Helpers";

const RecentWorkflowCard = ({ workflow }) => {
  return (
    <Link
      href={`/dashboard/workflows/${workflow._id}`}
      className="group flex items-center justify-between rounded-2xl border border-[#27272A] bg-[#18181B] p-5 transition-all duration-300 hover:border-[#7C3AED]/40 hover:bg-[#1D1D22]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[#7C3AED]">
          <PlayCircle size={24} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">
            {workflow.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#71717A]">
            <span className="flex items-center gap-1">
              <Clock3 size={14} />
             {formatTimeAgo(workflow.updatedAt)}
            </span>
            <span>{workflow.executionCount} Executions</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            workflow.status === "published"
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {workflow.status}
        </span>

        <ArrowUpRight
          size={18}
          className="text-[#71717A] transition group-hover:text-[#7C3AED]"
        />
      </div>
    </Link>
  );
};

export default RecentWorkflowCard;