import React from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';
import ThreadReplies from './ThreadReplies';



export default function DiscussionThread({
  authorName,
  authorImageUrl,
  title,
  content,
  createdAt,
  likesCount,
  commentsCount,
  isExpanded = false,
}) {
  const [expanded, setExpanded] = React.useState(isExpanded);
  const [liked, setLiked] = React.useState(false);

  return (
    <div className="p-6 space-y-4 bg-gray-900 border border-gray-800 rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={authorImageUrl}
            alt={authorName}
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-white">{authorName}</h3>
            <span className="text-sm text-gray-400">{createdAt}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold text-white">{title}</h2>
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
            <span>{likesCount}</span>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-white"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{commentsCount}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* {expanded && <ThreadReplies threadId="1" />} */}
    </div>
  );
}