import React from "react";

const ExecutionDetailsShimmer = () => {
  return (
    <div className="min-h-screen animate-pulse bg-[#0F0F13] p-8">
      {/* Back Button */}
      <div className="mb-8 h-5 w-40 rounded bg-[#232329]" />

      <div className="rounded-3xl border border-[#27272A] bg-[#18181B] p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="h-8 w-64 rounded bg-[#232329]" />
            <div className="mt-4 h-4 w-96 rounded bg-[#232329]" />
          </div>

          <div className="h-10 w-28 rounded-full bg-[#232329]" />
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-[#111114] p-5"
            >
              <div className="h-3 w-20 rounded bg-[#232329]" />
              <div className="mt-4 h-6 w-28 rounded bg-[#232329]" />
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-10 rounded-2xl border border-[#27272A] bg-[#111114] p-6">
          <div className="mb-6 h-6 w-52 rounded bg-[#232329]" />

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-[#18181B] p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-5 w-36 rounded bg-[#232329]" />
                    <div className="mt-3 h-3 w-28 rounded bg-[#232329]" />
                  </div>

                  <div className="h-8 w-8 rounded-full bg-[#232329]" />
                </div>

                <div className="mt-5 rounded-xl bg-[#111114] p-4">
                  <div className="h-4 w-16 rounded bg-[#232329]" />

                  <div className="mt-3 h-20 w-full rounded bg-[#232329]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="mt-8 rounded-2xl border border-[#27272A] bg-[#18181B]">
          <div className="border-b border-[#27272A] p-5">
            <div className="h-5 w-24 rounded bg-[#232329]" />
          </div>

          <div className="p-5">
            <div className="h-56 w-full rounded bg-[#232329]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionDetailsShimmer;