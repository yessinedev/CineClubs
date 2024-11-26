import React from 'react';
import { Users, MessageCircle, Heart, Star } from 'lucide-react';



function MetricCard({ icon, label, value, change }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4">
      <div className="flex items-center text-purple-400 mb-1">
        {icon}
        <span className="text-sm ml-1">{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-white">{value}</span>
        <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
}

export default function LeaderboardMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <MetricCard
        icon={<Users className="w-4 h-4" />}
        label="Total Members"
        value="125.4k"
        change={12}
      />
      <MetricCard
        icon={<MessageCircle className="w-4 h-4" />}
        label="Discussions"
        value="45.2k"
        change={8}
      />
      <MetricCard
        icon={<Heart className="w-4 h-4" />}
        label="Engagement"
        value="892k"
        change={15}
      />
      <MetricCard
        icon={<Star className="w-4 h-4" />}
        label="New Clubs"
        value="234"
        change={-3}
      />
    </div>
  );
}