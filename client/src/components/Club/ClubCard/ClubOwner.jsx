import React from 'react';


export default function ClubOwner({ ownerUsername, ownerImageUrl }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={ownerImageUrl}
        alt={ownerUsername}
        className="w-6 h-6 rounded-full object-cover"
      />
      <span className="text-sm text-gray-400">
        Created by <span className="text-white">{ownerUsername}</span>
      </span>
    </div>
  );
}