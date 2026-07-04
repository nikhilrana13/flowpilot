const RecentWorkflowCardShimmer = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-[#27272A] bg-[#18181B] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#27272A]" />

          <div className="space-y-3">
            <div className="h-4 w-44 rounded bg-[#27272A]" />
            <div className="h-3 w-28 rounded bg-[#27272A]" />
          </div>
        </div>

        <div className="h-7 w-20 rounded-full bg-[#27272A]" />
      </div>
    </div>
  );
};

export default RecentWorkflowCardShimmer;