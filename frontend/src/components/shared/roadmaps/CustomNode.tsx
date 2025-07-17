// frontend/src/components/shared/roadmaps/CustomNode.tsx

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// Update the data prop type
const CustomNode = ({ data }: { data: { label: string; description: string; is_completed: boolean } }) => {
  // Conditionally set the color
  const nodeColor = data.is_completed
    ? "bg-green-500 border-green-700" // Completed color
    : "bg-yellow-400 border-black";   // Pending color

  return (
    <div className={`shadow-lg text-black px-5 py-3 text-center rounded-md border-2 ${nodeColor}`}>
      <Handle type="target" position={Position.Top} className="!bg-black" />
      <div className="text-base font-bold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-black" />
    </div>
  );
};

export default memo(CustomNode);