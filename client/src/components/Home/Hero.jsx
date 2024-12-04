import { fetchTotalClubsAndPosts } from "@/services/clubService";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Code2 } from "lucide-react";
import { Globe2 } from "lucide-react";
import { Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Hero() {
  const { isSignedIn } = useUser();
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchTotalClubsAndPosts,
  });
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000"
          alt="Community Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-950" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Connect with Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-pink-500">
              Perfect Community
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join vibrant communities, share your passions, and connect with like-minded people from all walks of life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white rounded-full flex items-center gap-2 transition-all transform hover:scale-105">
              <Globe2 className="w-5 h-5" />
              Explore Communities
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full flex items-center gap-2 transition-all">
              <Users className="w-5 h-5" />
              Create Community
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <Users className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Active Communities</h3>
            <p className="text-gray-400">Join thriving communities across various interests and fields.</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <MessageSquare className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Meaningful Discussions</h3>
            <p className="text-gray-400">Engage in rich conversations with community members worldwide.</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <TrendingUp className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Grow Together</h3>
            <p className="text-gray-400">Learn, share, and grow with your community members.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
