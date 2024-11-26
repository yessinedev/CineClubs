import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Users, MessageCircle } from 'lucide-react';

const TOP_CLUBS = [
  {
    rank: 1,
    previousRank: 2,
    name: "Classic Cinema Club",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=100",
    members: "2.4k",
    discussions: 342,
    weeklyActivity: 89,
  },
  {
    rank: 2,
    previousRank: 1,
    name: "Sci-Fi Explorers",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=100",
    members: "3.1k",
    discussions: 421,
    weeklyActivity: 85,
  },
  {
    rank: 3,
    previousRank: 3,
    name: "Horror Movie Fans",
    image: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&q=80&w=100",
    members: "1.8k",
    discussions: 256,
    weeklyActivity: 78,
  },
];

function RankChange({ current, previous }) {
  if (current === previous) {
    return <Minus className="w-4 h-4 text-gray-400" />;
  }
  return current < previous ? (
    <TrendingUp className="w-4 h-4 text-green-400" />
  ) : (
    <TrendingDown className="w-4 h-4 text-red-400" />
  );
}

function RankBadge({ rank }) {
  const badgeColors = {
    1: "bg-yellow-500",
    2: "bg-gray-300",
    3: "bg-amber-600",
  };

  return rank <= 3 ? (
    <div className={`${badgeColors[rank]} p-1 rounded-full`}>
      <Trophy className="w-4 h-4 text-gray-900" />
    </div>
  ) : (
    <span className="text-lg font-semibold text-gray-400">#{rank}</span>
  );
}

export default function LeaderboardTable() {
  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Club</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Members</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Discussions</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Activity Score</th>
            </tr>
          </thead>
          <tbody>
            {TOP_CLUBS.map((club) => (
              <tr key={club.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <RankBadge rank={club.rank} />
                    <RankChange current={club.rank} previous={club.previousRank} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={club.image}
                      alt={club.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-white">{club.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{club.members}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-gray-300">
                    <MessageCircle className="w-4 h-4" />
                    <span>{club.discussions}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${club.weeklyActivity}%` }}
                      />
                    </div>
                    <span className="text-gray-300">{club.weeklyActivity}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}