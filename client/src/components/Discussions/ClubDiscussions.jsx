import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import DiscussionThread from './DiscussionThread';

const SAMPLE_DISCUSSIONS = [
  {
    id: '1',
    author: {
      name: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    },
    title: 'The Evolution of Visual Effects in Modern Cinema',
    content: 'Looking back at the past decade, the advancement in VFX has been remarkable. From Avatar to the latest Marvel films, how do you think this has impacted storytelling?',
    timestamp: '3 hours ago',
    likes: 24,
    replies: 8,
  },
  {
    id: '2',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    },
    title: 'Hidden Gems: Underrated Films of 2023',
    content: 'While blockbusters dominate the box office, there have been some incredible smaller films this year that deserve more attention. What are your discoveries?',
    timestamp: '5 hours ago',
    likes: 15,
    replies: 12,
  },
];

export default function ClubDiscussions({posts, user}) {
  const [showNewThread, setShowNewThread] = React.useState(false);
  const [newThread, setNewThread] = React.useState({ title: '', content: '' });

  const handleSubmitThread = (e) => {
    e.preventDefault();
    // Handle thread submission
    setShowNewThread(false);
    setNewThread({ title: '', content: '' });
  };

  return (
    <section className="py-12 bg-gray-950">
      <div className="sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Discussions</h2>
          <button
            onClick={() => setShowNewThread(true)}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-purple-500 rounded-xl hover:bg-purple-600"
          >
            <MessageSquarePlus className="w-5 h-5" />
            New Thread
          </button>
        </div>

        {showNewThread && (
          <form onSubmit={handleSubmitThread} className="p-6 mb-8 space-y-4 bg-gray-900 rounded-xl">
            <input
              type="text"
              value={newThread.title}
              onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
              placeholder="Thread title"
              className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <textarea
              value={newThread.content}
              onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewThread(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-xl hover:bg-purple-600"
              >
                Post Thread
              </button>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {posts?.map((post) => (
            <DiscussionThread key={post.id} post={post} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
}