import React from 'react';
import { Tag } from 'lucide-react';


export default function ClubCategory({ category }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-800/50 rounded-full w-fit">
      <Tag className="w-3 h-3 text-blue-400" />
      <span className="text-sm text-gray-300">{category.name}</span>
    </div>
  );
}