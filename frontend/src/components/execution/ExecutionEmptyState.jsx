import { Clock3 } from 'lucide-react';
import React from 'react';

const ExecutionEmptyState = () => {
  return (
     <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-[#27272A]">
        <Clock3
            size={50}
            className="text-[#52525B]"
        />
        <h3 className="mt-5 text-lg font-semibold text-white">
            No Executions Yet
        </h3>
        <p className="mt-2 text-[#71717A]">
            Execute your workflow to see execution history.
        </p>
    </div>
  );
}

export default ExecutionEmptyState;
