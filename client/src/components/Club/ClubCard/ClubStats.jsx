import React from 'react';
import { Users, MessageSquare, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';


export default function ClubStats({ membersCount, postsCount, createdAt }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        <span>{membersCount} {membersCount === 1 ? 'member' : 'members'}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageSquare className="w-4 h-4" />
        <span>{postsCount} {postsCount === 1 ? 'post' : 'posts'}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>Created {formatDate(createdAt)}</span>
      </div>
    </div>
  );
}