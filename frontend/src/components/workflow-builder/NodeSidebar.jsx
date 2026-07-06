import React from 'react';
import { NODE_TYPES } from '../constants/Nodes';
import NodeItem from './NodeItem';

const NodeSidebar = () => {
  return (
    <div className="w-72 border-r border-[#27272A] bg-[#18181B] p-5">
      <h2 className="mb-6 text-lg font-semibold text-white">
        Nodes
      </h2>
      <div className="space-y-3">
        {NODE_TYPES.map((node) => (
          <NodeItem
            key={node.type}
            node={node}
          />
        ))}
      </div>
    </div>
  );
}

export default NodeSidebar;
