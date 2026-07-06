const WorkflowBuilderLoading = () => {
  return (
    <div className="h-screen w-full animate-pulse overflow-hidden bg-[#0F0F13]">
      {/* Header */}
      <div className="flex h-[72px] items-center justify-between border-b border-[#27272A] bg-[#18181B] px-6">
        <div className="flex items-center gap-5">
          <div className="h-10 w-28 rounded-xl bg-[#27272A]" />

          <div>
            <div className="h-5 w-48 rounded bg-[#27272A]" />
            <div className="mt-2 h-4 w-20 rounded-full bg-[#27272A]" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-24 rounded-xl bg-[#27272A]" />
          <div className="h-10 w-28 rounded-xl bg-[#27272A]" />
        </div>
      </div>

      {/* Builder */}
      <div className="flex h-[calc(100vh-72px)]">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-[#27272A] bg-[#18181B] p-5">
          <div className="mb-6 h-5 w-32 rounded bg-[#27272A]" />

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="mb-4 flex items-center gap-3 rounded-xl border border-[#27272A] p-3"
            >
              <div className="h-10 w-10 rounded-lg bg-[#27272A]" />

              <div className="flex-1">
                <div className="h-4 w-28 rounded bg-[#27272A]" />
                <div className="mt-2 h-3 w-16 rounded bg-[#27272A]" />
              </div>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="relative flex-1 bg-[#111114]">
          <div className="absolute left-1/2 top-1/3 h-16 w-52 -translate-x-1/2 rounded-2xl border border-[#27272A] bg-[#18181B]" />

          <div className="absolute left-1/2 top-[42%] h-20 w-[2px] -translate-x-1/2 bg-[#27272A]" />

          <div className="absolute left-1/2 top-[48%] h-16 w-56 -translate-x-1/2 rounded-2xl border border-[#27272A] bg-[#18181B]" />

          <div className="absolute left-1/2 top-[60%] h-20 w-[2px] -translate-x-1/2 bg-[#27272A]" />

          <div className="absolute left-1/2 top-[66%] h-16 w-52 -translate-x-1/2 rounded-2xl border border-[#27272A] bg-[#18181B]" />
        </div>

        {/* Right Config */}
        <div className="w-96 border-l border-[#27272A] bg-[#18181B] p-6">
          <div className="mb-8 h-6 w-36 rounded bg-[#27272A]" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="mb-6">
              <div className="mb-2 h-4 w-24 rounded bg-[#27272A]" />
              <div className="h-11 rounded-xl bg-[#27272A]" />
            </div>
          ))}

          <div className="mt-8 h-11 rounded-xl bg-[#27272A]" />
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilderLoading;