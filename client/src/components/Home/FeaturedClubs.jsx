import { fetchClubs } from "@/services/clubService";
import { useQuery } from "@tanstack/react-query";
import { Star, TrendingUp } from "lucide-react";
import { ClubCard } from "../Club/ClubCard";
import { Link } from "react-router-dom";


export default function FeaturedClubs() {

  const {
    data: clubs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
  });

  
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading clubs...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-500 bg-red-100 rounded-lg shadow">
          Error: {error.message}
        </div>
      </div>
    );
  return (
    <section className="py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <Star className="text-yellow-500" />
            Featured Clubs
          </h2>
          <Link to="/clubs" className="flex items-center gap-1 text-purple-400 hover:text-purple-300">
            <TrendingUp className="w-4 h-4" />
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clubs && clubs.map((club) => (
            <ClubCard key={club.id} club={club}/>
          ))}
        </div>
      </div>
    </section>
  );
}
