import React from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';
import ThreadReplies from './ThreadReplies';

interface DiscussionThreadProps {
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isExpanded?: boolean;
}

export default function DiscussionThread({
  author,
  title,
  content,
  timestamp,
  likes,
  replies,
  isExpanded = false,
}: DiscussionThreadProps) {
  const [expanded, setExpanded] = React.useState(isExpanded);
  const [liked, setLiked] = React.useState(false);

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-4 border border-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-white">{author.name}</h3>
            <span className="text-sm text-gray-400">{timestamp}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-gray-300">{content}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-1.5 ${
              liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
            }`}
          >
            <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
            <span>{liked ? likes + 1 : likes}</span>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-white"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{replies}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {expanded && <ThreadReplies threadId="1" />}
    </div>
  );
}