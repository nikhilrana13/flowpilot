"use client";

import { Handle, Position } from "@xyflow/react";

const BaseNode = ({data,icon: Icon,title,description,color,source = true,target=false}) => {
  return (
    <div className="min-w-[240px] rounded-2xl border border-[#27272A] bg-[#18181B] p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div
          className="rounded-xl p-3"
          style={{
            background: `${color}20`,
          }}
        >
          <Icon
            size={20}
            style={{ color }}
          />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {data.label || title}
          </h3>

          <p className="text-xs text-[#A1A1AA]">
            {description}
          </p>
        </div>
      </div>

      {target && (
        <Handle
          type="target"
          position={Position.Top}
        />
      )}

      {source && (
        <Handle
          type="source"
          position={Position.Bottom}
        />
      )}
    </div>
  );
};

export default BaseNode;