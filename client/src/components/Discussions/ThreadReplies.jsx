import React from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';


const SAMPLE_REPLIES = [
  {
    id: '1',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    },
    content: 'The cinematography in this film was absolutely breathtaking. Every frame could be a painting!',
    timestamp: '2 hours ago',
    likes: 12,
  },
  {
    id: '2',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    },
    content: 'I completely agree! The director really knows how to capture emotion through visual storytelling.',
    timestamp: '1 hour ago',
    likes: 8,
  },
];


export default function ThreadReplies({ threadId }) {
  const [newReply, setNewReply] = React.useState('');

  const handleSubmitReply = (e) => {
    e.preventDefault();
    // Handle reply submission
    setNewReply('');
  };

  return (
    <div className="pt-4 space-y-4">
      <form onSubmit={handleSubmitReply} className="space-y-3">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write a reply..."
          className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          Post Reply
        </button>
      </form>

      <div className="space-y-4">
        {SAMPLE_REPLIES.map((reply) => (
          <div key={reply.id} className="flex p-4 space-x-3 rounded-lg bg-gray-800/50">
            <img
              src={reply.avatar}
              alt={reply.author.name}
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-white">{reply.author.name}</span>
                  <span className="ml-2 text-sm text-gray-400">{reply.timestamp}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-1 text-gray-300">{reply.content}</p>
              <button className="flex items-center mt-2 space-x-1 text-gray-400 hover:text-pink-500">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{reply.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}