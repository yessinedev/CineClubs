import { fetchTotalClubsAndPosts } from "@/services/clubService";
import { useQuery } from "@tanstack/react-query";
import { Code2 } from "lucide-react";
import { Play, Users, MessageCircle } from "lucide-react";

export default function Hero() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchTotalClubsAndPosts,
  });
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=2000"
          alt="Programming Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Where Code Meets
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">
            Community
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join passionate communities of developers, share knowledge, and level
          up your programming skills with like-minded tech enthusiasts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-colors">
            <Code2 className="w-5 h-5" />
            Start Coding
          </button>
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl flex items-center gap-2 transition-colors">
            <Users className="w-5 h-5" />
            Browse Communities
          </button>
        </div>
        {stats && (
          <div className="flex items-center justify-center gap-8 mt-12 text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>{`${stats.totalPosts}+ Developers`}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              <span>{`${stats.totalClubs}+ Active Communities`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
