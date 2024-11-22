import { Users, Star, TrendingUp } from 'lucide-react';

const featuredClubs = [
  {
    id: 1,
    name: "Sci-Fi Explorers",
    members: 2.4,
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=1200",
    description: "Discover and discuss the best of science fiction across all eras",
  },
  {
    id: 2,
    name: "Classic Cinema",
    members: 1.8,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200",
    description: "Celebrating timeless films from the golden age of cinema",
  },
  {
    id: 3,
    name: "True Crime Addicts",
    members: 3.1,
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&q=80&w=1200",
    description: "Explore the most intriguing true crime documentaries and series",
  }
];

export default function FeaturedClubs() {
  return (
    <section className="py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <Star className="text-yellow-500" />
            Featured Clubs
          </h2>
          <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300">
            <TrendingUp className="w-4 h-4" />
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredClubs.map((club) => (
            <div key={club.id} className="overflow-hidden transition-all duration-300 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={club.image}
                  alt={club.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-white">{club.name}</h3>
                <p className="mb-4 text-gray-400">{club.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-1" />
                    {club.members}k members
                  </span>
                  <button className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600">
                    Join Club
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}