"use client";

import { MousePointerClick } from "lucide-react";

const EmptyNodeConfig = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#27272A] bg-[#111114]">
        <MousePointerClick className="h-8 w-8 text-[#7C3AED]" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        No Node Selected
      </h3>

      <p className="mt-2 max-w-xs text-sm leading-6 text-[#A1A1AA]">
        Select a node from the workflow canvas to configure its settings.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-dashed border-[#27272A] bg-[#111114] p-4">
        <p className="text-xs leading-6 text-[#71717A]">
          💡 Tip: Drag a node from the left sidebar or click an existing node
          to start configuring it.
        </p>
      </div>
    </div>
  );
};

export default EmptyNodeConfig;