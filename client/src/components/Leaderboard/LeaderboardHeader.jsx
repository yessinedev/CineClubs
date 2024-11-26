import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

export default function LeaderboardHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-white">Club Leaderboard</h1>
      </div>
      <p className="text-gray-300 max-w-2xl">
        Discover the most vibrant and engaging movie clubs on CineClub. Rankings are updated weekly based on member activity, discussions, and overall engagement.
      </p>
      <div className="flex items-center gap-2 mt-4 text-purple-400">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm">Last updated: March 15, 2024</span>
      </div>
    </div>
  );
}