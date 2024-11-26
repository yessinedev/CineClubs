import { fetchTotalClubsAndPosts } from "@/services/clubService";
import { useQuery } from "@tanstack/react-query";
import { Play, Users, MessageCircle } from "lucide-react";

export default function Hero() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchTotalClubsAndPosts,
  });
  return (
    <div className="relative flex justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
          alt="Cinema Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      </div>

      <div className="relative px-4 py-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Where Movie Magic Meets
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Community
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300">
          Join passionate communities of film and TV enthusiasts. Discover,
          discuss, and celebrate your favorite content with like-minded fans.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="flex items-center gap-2 px-8 py-3 text-white transition-colors bg-purple-500 rounded-full hover:bg-purple-600">
            <Play className="w-5 h-5" />
            Get Started
          </button>
          <button className="flex items-center gap-2 px-8 py-3 text-white transition-colors bg-gray-800 rounded-full hover:bg-gray-700">
            <Users className="w-5 h-5" />
            Browse Clubs
          </button>
        </div>
        {stats && (
          <div className="flex items-center justify-center gap-8 mt-12 text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>{`${stats.totalPosts}+ Members`}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              <span>{`${stats.totalClubs}+ Active Clubs`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
