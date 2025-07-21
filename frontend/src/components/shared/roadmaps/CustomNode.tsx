// frontend/src/components/shared/roadmaps/CustomNode.tsx

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// Update the data prop type
const CustomNode = ({ data }: { data: { label: string; description: string; status: string } }) => {
  // Conditionally set the color
  const nodeColor =
    data.status === 'done'
      ? 'bg-green-500 border-green-700' // Completed color
      : data.status === 'in_progress'
      ? 'bg-blue-500 border-blue-700' // In progress color
      : data.status === 'skip'
      ? 'bg-gray-500 border-gray-700' // Skipped color
      : 'bg-yellow-400 border-black'; // Not started color

  return (
    <div className={`shadow-lg text-white px-5 py-3 text-center rounded-md border-2 ${nodeColor}`}>
      <Handle type="target" position={Position.Top} className="!bg-black" />
      <div className="text-base font-bold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-black" />
    </div>
  );
};

export default memo(CustomNode);