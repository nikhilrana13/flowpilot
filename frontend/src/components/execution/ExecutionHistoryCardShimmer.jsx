const ExecutionHistoryCardShimmer = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-[#27272A] bg-[#18181B] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Icon */}
          <div className="h-12 w-12 rounded-xl bg-[#27272A]" />

          <div className="flex-1">
            {/* Status + Badge */}
            <div className="flex items-center gap-3">
              <div className="h-5 w-28 rounded bg-[#27272A]" />
              <div className="h-5 w-20 rounded-full bg-[#27272A]" />
            </div>

            {/* Meta */}
            <div className="mt-4 flex gap-5">
              <div className="h-4 w-24 rounded bg-[#27272A]" />
              <div className="h-4 w-40 rounded bg-[#27272A]" />
              <div className="h-4 w-16 rounded bg-[#27272A]" />
            </div>

            {/* ID */}
            <div className="mt-4 h-3 w-56 rounded bg-[#27272A]" />
          </div>
        </div>

        {/* Arrow */}
        <div className="h-6 w-6 rounded bg-[#27272A]" />
      </div>
    </div>
  );
};

export default ExecutionHistoryCardShimmer;