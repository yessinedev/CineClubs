import { Film, MessageCircle, Star, Users } from "lucide-react";


export default function ClubDetails() {
  return (
    <div className="p-6 bg-gray-900 border border-gray-800 shadow-xl rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold text-white">Classic Cinema Club</h1>
          <p className="mb-6 text-gray-400">
            A community dedicated to celebrating and discussing timeless films from the golden age of cinema.
            From silent films to Hollywood's golden era, we explore the masterpieces that shaped film history.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-1 text-purple-400">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">Members</span>
              </div>
              <span className="text-xl font-semibold text-white">2.4k</span>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-1 text-purple-400">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">Discussions</span>
              </div>
              <span className="text-xl font-semibold text-white">342</span>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-1 text-purple-400">
                <Film className="w-4 h-4 mr-1" />
                <span className="text-sm">Movies</span>
              </div>
              <span className="text-xl font-semibold text-white">156</span>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-1 text-purple-400">
                <Star className="w-4 h-4 mr-1" />
                <span className="text-sm">Rating</span>
              </div>
              <span className="text-xl font-semibold text-white">4.9</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm text-gray-300 bg-gray-800 rounded-full">Film Noir</span>
            <span className="px-3 py-1 text-sm text-gray-300 bg-gray-800 rounded-full">Golden Age</span>
            <span className="px-3 py-1 text-sm text-gray-300 bg-gray-800 rounded-full">Silent Films</span>
            <span className="px-3 py-1 text-sm text-gray-300 bg-gray-800 rounded-full">Hollywood</span>
          </div>
        </div>
        
        <button className="px-6 py-2 ml-4 text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600">
          Join Club
        </button>
      </div>
    </div>
  );
}