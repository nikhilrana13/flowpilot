import React from 'react';

const ManualForm = ({node}) => {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Manual Trigger
        </h2>

        <p className="mt-1 text-sm text-[#A1A1AA]">
          Configure the manual trigger.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Node Name
        </label>

        <input
          type="text"
          value={node.data.label}
          className="h-11 w-full rounded-xl border border-[#27272A] bg-[#111114] px-4 text-white outline-none"
          readOnly
        />
      </div>

      <div className="rounded-xl border border-[#27272A] bg-[#111114] p-4">
        <p className="text-sm text-[#A1A1AA]">
          This workflow starts when you manually run it from the dashboard.
        </p>
      </div>
    </div>
  );
}

export default ManualForm;
