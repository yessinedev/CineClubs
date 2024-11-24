import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import DiscussionThread from './DiscussionThread';
import { createPost, fetchClubPosts } from '@/services/postService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';



export default function ClubDiscussions({clubId, user}) {
  const [showNewThread, setShowNewThread] = React.useState(false);
  const [newThread, setNewThread] = React.useState({ title: '', content: '' });
  
  const queryClient = useQueryClient();
  // Mutation to create a post
  const { mutate: createPostMutation } = useMutation({
    mutationFn: ({ thread, userId, clubId }) => createPost(thread, userId, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", user.id, clubId]); // Refetch club details
    },
    onError: (error) => {
      console.error("Failed to like the post:", error);
    },
  });
  const {
    data: clubPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", clubId],
    queryFn: () => fetchClubPosts(clubId, user.id),
  });

  const handleSubmitThread = async (e) => {
    e.preventDefault();
    console.log(newThread)
    // Handle thread submission
    createPostMutation({
      thread: newThread,
      userId: user.id,
      clubId: clubId,
    });
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
          {clubPosts?.map((post) => (
            <DiscussionThread key={post.id} post={post} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
}