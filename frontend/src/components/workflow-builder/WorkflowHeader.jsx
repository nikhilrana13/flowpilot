"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
  Rocket,
} from "lucide-react";

const WorkflowHeader = ({ workflow,onSave,onPublish,saving = false,publishing = false,}) => {
  return (
    <header className="sticky top-0 z-50 py-3 flex h-[72px] items-center justify-between border-b border-[#27272A] bg-[#18181B] px-6">
      {/* Left */}
      <div className="flex items-center gap-5">
        <Link
          href={`/dashboard/workspaces/${workflow?.workspaceId}`}
          className="flex items-center gap-2 rounded-xl border border-[#2A2A33] px-3 py-2 text-sm text-[#A1A1AA] transition hover:border-[#7C3AED]/40 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
        <div className="flex gap-5 items-center">
          <h1 className="text-lg font-semibold text-white">
            {workflow?.name}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                workflow?.status === "published"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {workflow?.status === "published"
                ? "Published"
                : "Draft"}
            </span>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center cursor-pointer gap-2 rounded-xl border border-[#2A2A33] px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#7C3AED]/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}

          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onPublish}
          disabled={publishing}
          className="flex items-center cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,.25)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {publishing ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Rocket size={17} />
          )}
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </header>
  );
};

export default WorkflowHeader;