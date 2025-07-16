import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }: { data: { label: string, description: string } }) => {
  return (
    <div className="bg-gray-800 border-2 border-purple-500 rounded-lg shadow-xl w-[250px] h-[150px] text-white p-4 flex flex-col justify-center items-center">
      <Handle type="target" position={Position.Top} className="w-16 !bg-purple-500" />
      <div className="text-center">
        <div className="text-lg font-bold mb-2">{data.label}</div>
        <p className="text-xs text-gray-300">{data.description?.substring(0, 100) || 'No description'}{data.description && data.description.length > 100 ? '...' : ''}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-purple-500" />
    </div>
  );
};

export default memo(CustomNode);
