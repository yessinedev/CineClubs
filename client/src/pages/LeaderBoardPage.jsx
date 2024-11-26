import LeaderboardHeader from "@/components/Leaderboard/LeaderBoardHeader";
import LeaderboardMetrics from "@/components/Leaderboard/LeaderboardMetrics";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import React from "react";

const LeaderBoardPage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <LeaderboardHeader />
        <LeaderboardMetrics />
        <LeaderboardTable />
      </main>
    </div>
  );
};

export default LeaderBoardPage;
