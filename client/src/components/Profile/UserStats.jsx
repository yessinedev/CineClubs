import { Users, MessageCircle, Heart, Star } from 'lucide-react';

export default function UserStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800/50 p-4 rounded-xl">
        <div className="flex items-center text-purple-400 mb-1">
          <Users className="w-4 h-4 mr-1" />
          <span className="text-sm">Clubs Joined</span>
        </div>
        <span className="text-2xl font-semibold text-white">12</span>
      </div>
      
      <div className="bg-gray-800/50 p-4 rounded-xl">
        <div className="flex items-center text-purple-400 mb-1">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">Threads</span>
        </div>
        <span className="text-2xl font-semibold text-white">48</span>
      </div>
      
      <div className="bg-gray-800/50 p-4 rounded-xl">
        <div className="flex items-center text-purple-400 mb-1">
          <Heart className="w-4 h-4 mr-1" />
          <span className="text-sm">Likes</span>
        </div>
        <span className="text-2xl font-semibold text-white">256</span>
      </div>
      
      {/* <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="flex items-center text-purple-400 mb-1">
          <Star className="w-4 h-4 mr-1" />
          <span className="text-sm">Reputation</span>
        </div>
        <span className="text-2xl font-semibold text-white">4.9</span>
      </div> */}
    </div>
  );
}