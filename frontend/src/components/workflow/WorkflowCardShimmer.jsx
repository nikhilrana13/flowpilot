const WorkflowCardShimmer = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-[#161022] p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/10" />

          <div>
            <div className="h-5 w-40 rounded bg-white/10" />
            <div className="mt-3 h-6 w-20 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="h-8 w-8 rounded-lg bg-white/10" />
      </div>

      {/* Description */}
      <div className="mt-6 space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-5/6 rounded bg-white/10" />
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-white/10" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 rounded bg-white/10" />

        <div className="h-10 w-24 rounded-lg bg-white/10" />
      </div>
    </div>
  );
};

export default WorkflowCardShimmer;