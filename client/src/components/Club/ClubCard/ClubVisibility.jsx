import React from 'react';
import { Lock, Globe } from 'lucide-react';


export default function ClubVisibility({ isPublic }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {isPublic ? (
        <>
          <Globe className="w-4 h-4 text-green-400" />
          <span className="text-green-400">Public</span>
        </>
      ) : (
        <>
          <Lock className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400">Private</span>
        </>
      )}
    </div>
  );
}