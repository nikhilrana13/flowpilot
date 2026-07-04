const StatsCardShimmer = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B] p-6">
      <div className="absolute inset-0 animate-pulse bg-white/5" />
      <div className="relative flex items-center justify-between">
        <div className="space-y-4">
          <div className="h-4 w-32 rounded bg-[#27272A] animate-pulse" />
          <div className="h-9 w-20 rounded bg-[#27272A] animate-pulse" />
        </div>
        <div className="h-14 w-14 rounded-2xl bg-[#27272A] animate-pulse" />
      </div>
    </div>
  );
};

export default StatsCardShimmer