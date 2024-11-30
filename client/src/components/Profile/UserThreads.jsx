import { formatCreatedAt } from '@/lib/dateUtils';
import { MessageCircle, Heart, Share2 } from 'lucide-react';



export default function UserThreads({posts}) {
  return (
    <div className="space-y-6">
      {posts.length > 0 && posts.map((thread) => (
        <div key={thread.id} className="bg-gray-800/50 rounded-xl p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-400">{thread.clubName}</span>
              <span className="text-sm text-gray-400">{formatCreatedAt(thread.createdAt)}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{thread.title}</h3>
            <p className="text-gray-300">{thread.content}</p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1.5 text-gray-400 hover:text-pink-500">
                <Heart className="w-5 h-5" />
                <span>{thread.likesCount}</span>
              </button>
              <button className="flex items-center space-x-1.5 text-gray-400 hover:text-white">
                <MessageCircle className="w-5 h-5" />
                <span>{thread.commentsCount}</span>
              </button>
            </div>
            <button className="text-gray-400 hover:text-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}