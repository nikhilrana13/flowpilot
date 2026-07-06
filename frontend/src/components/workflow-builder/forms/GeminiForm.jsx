import useUpdateNodeData from '@/hooks/useUpdateNodedata';
import React from 'react';

const GeminiForm = ({ node }) => {
  const updateNodeData = useUpdateNodeData()
  return (
    <div className="space-y-6 p-5">
      {/* Heading */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Gemini AI
        </h2>
        <p className="mt-1 text-sm text-[#A1A1AA]">
          Configure the AI prompt for this node.
        </p>
      </div>
      {/* Node Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Node Name
        </label>
        <input
          type="text"
          value={node?.data?.label || ""}
          onChange={(e) =>
            updateNodeData(node.id, {
              label: e.target.value,
            })
          }
          placeholder="Repository Analyzer"
          className="h-11 w-full rounded-xl border border-[#27272A] bg-[#111114] px-4 text-white outline-none transition focus:border-[#7C3AED]"
        />
      </div>

      {/* Prompt */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Prompt
        </label>

        <textarea
          rows={10}
          value={node?.data?.prompt || ""}
          onChange={(e) =>
            updateNodeData(node.id, {
              prompt: e.target.value,
            })
          }
          placeholder={`Analyze the incoming data and return a short summary.

     Example:
- Extract important information
- Return the response as JSON
- Keep the answer concise`}
          className="w-full resize-none rounded-xl border border-[#27272A] bg-[#111114] p-4 text-sm text-white outline-none transition focus:border-[#7C3AED]"
        />
      </div>

      {/* Info */}
      <div className="rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/10 p-4">
        <p className="text-sm leading-6 text-[#DDD6FE]">
          The output of the previous node will automatically be provided to the
          Gemini model as input when this workflow runs.
        </p>
      </div>
    </div>
  );
}

export default GeminiForm;
