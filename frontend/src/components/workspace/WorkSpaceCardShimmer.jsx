import React from "react";

const WorkspaceCardShimmer = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-6">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#7C3AED]/10 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-2xl bg-[#27272A]" />

          <div className="space-y-3">
            <div className="h-5 w-40 animate-pulse rounded bg-[#27272A]" />
            <div className="h-4 w-56 animate-pulse rounded bg-[#27272A]" />
          </div>
        </div>

        <div className="h-9 w-9 animate-pulse rounded-lg bg-[#27272A]" />
      </div>
      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-[#27272A] pt-5">
        <div className="h-4 w-24 animate-pulse rounded bg-[#27272A]" />

        <div className="h-5 w-36 animate-pulse rounded bg-[#27272A]" />
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export default WorkspaceCardShimmer;