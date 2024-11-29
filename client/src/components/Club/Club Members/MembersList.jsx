import React from 'react';
import { Search, Users } from 'lucide-react';
import MemberCard from './MemberCard';
import MembersListHeader from './MembersListHeader';

const SAMPLE_MEMBERS = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    role: 'Admin',
    joinDate: '2 years ago',
    contributions: 342,
  },
  {
    id: '2',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    role: 'Moderator',
    joinDate: '1 year ago',
    contributions: 156,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    role: 'Member',
    joinDate: '6 months ago',
    contributions: 89,
  },
  {
    id: '4',
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    role: 'Member',
    joinDate: '3 months ago',
    contributions: 45,
  },
];

export default function MembersList({members}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredMembers = members?.filter(member =>
    member.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <MembersListHeader memberCount={members?.length > 0 ? members.length : 0} />
      
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => (
            <MemberCard key={member.userId} member={member} />
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}