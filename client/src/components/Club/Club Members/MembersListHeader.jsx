import React from 'react';
import { Users, UserPlus, Shield } from 'lucide-react';



export default function MembersListHeader({ memberCount }) {
  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Members</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-sm">
            {memberCount}
          </span>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Invite Members</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center text-gray-400">
          <Shield className="w-4 h-4 mr-1.5 text-emerald-500" />
          <span>2 Admins</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Shield className="w-4 h-4 mr-1.5 text-blue-500" />
          <span>3 Moderators</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Users className="w-4 h-4 mr-1.5" />
          <span>{memberCount} Members</span>
        </div>
      </div>
    </div>
  );
}