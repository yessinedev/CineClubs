import React from 'react';
import { MessageCircle, UserPlus } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';



export default function MemberCard({ member }) {
    
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-800 transition-colors">
      <div className="flex items-center space-x-4">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
        />
        <div className=''>
          <h3 className="text-white font-medium">{member.name}</h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-purple-400">{member.role}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{formatDate(member.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="text-gray-400 flex items-center">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span>{member.postsCount}</span>
        </div>
        <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all">
          <UserPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}