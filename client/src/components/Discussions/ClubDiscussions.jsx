import React from "react";
import { MessageSquarePlus } from "lucide-react";
import DiscussionThread from "./DiscussionThread";
import { createPost, fetchClubPosts } from "@/services/postService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/lib/toast";

export default function ClubDiscussions({ clubId, user }) {
  const [showNewThread, setShowNewThread] = React.useState(false);
  const [newThread, setNewThread] = React.useState({ title: "", content: "" });

  const queryClient = useQueryClient();
  const { mutate: createPostMutation } = useMutation({
    mutationFn: ({ thread, userId, clubId }) =>
      createPost(thread, userId, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", user.id, clubId]);
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
    },
  });
  const { data: clubPosts } = useQuery({
    queryKey: ["club", clubId],
    queryFn: () => fetchClubPosts(clubId, user.id),
  });

  const handleSubmitThread = async (e) => {
    e.preventDefault();

    if (!newThread.title.trim() || !newThread.content.trim()) {
      showToast.error({ message: "Please fill in all fields" });
      return;
    }

    showToast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          createPostMutation(
            {
              thread: newThread,
              userId: user.id,
              clubId: clubId,
            },
            {
              onSuccess: (data) => resolve(data),
              onError: (error) => reject(error),
            }
          );
        }, 3000);
      }),
      {
        loading: "Creating your post...",
        success: "Post created successfully!",
        error: "Failed to create post",
      }
    );

    setShowNewThread(false);
    setNewThread({ title: "", content: "" });
  };

  return (
    <section className="py-12 bg-gray-950">
      <div className="sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Discussions</h2>
          <button
            onClick={() => setShowNewThread(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            <MessageSquarePlus className="w-5 h-5" />
            New Thread
          </button>
        </div>

        {showNewThread && (
          <form
            onSubmit={handleSubmitThread}
            className="p-6 mb-8 space-y-4 bg-gray-900 rounded-xl"
          >
            <input
              type="text"
              value={newThread.title}
              onChange={(e) =>
                setNewThread({ ...newThread, title: e.target.value })
              }
              placeholder="Thread title"
              className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <textarea
              value={newThread.content}
              onChange={(e) =>
                setNewThread({ ...newThread, content: e.target.value })
              }
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
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
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
