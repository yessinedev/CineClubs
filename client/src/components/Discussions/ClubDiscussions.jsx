import React from "react";
import { MessageSquarePlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/services/postService";
import { showToast } from "@/lib/toast";
import InfinitePostsList from "./InfinitePostsList";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

export default function ClubDiscussions({ club, user }) {
  const [showNewThread, setShowNewThread] = React.useState(false);
  const [newThread, setNewThread] = React.useState({ title: "", content: "" });
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfinitePosts({ clubId:club.id, userId: user.id });

  const { mutateAsync: createPostMutation } = useMutation({
    mutationFn: ({ thread, userId, clubId }) =>
      createPost(thread, userId, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", club.id, user.id]);
    },
  });

  const handleSubmitThread = async (e) => {
    e.preventDefault();

    if (!newThread.title.trim() || !newThread.content.trim()) {
      showToast.error({ message: "Please fill in all fields" });
      return;
    }

    try {
      await showToast.promise(
        createPostMutation({
          thread: newThread,
          userId: user.id,
          clubId: club.id,
        }),
        {
          loading: "Creating your post...",
          success: "Post created successfully!",
          error: (err) => err?.message || "Failed to create post",
        }
      );

      setShowNewThread(false);
      setNewThread({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (status === "pending") {
    return (
      <div className="text-center py-8 text-white">Loading discussions...</div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const allPosts = data.pages.flatMap((page) => page.items);

  return (
    <section className="py-8 sm:py-12 bg-gray-950">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-white">Discussions</h2>
          <button
            onClick={() => setShowNewThread(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            <MessageSquarePlus className="w-5 h-5" />
            New Thread
          </button>
        </div>

        {showNewThread && (
          <form
            onSubmit={handleSubmitThread}
            className="p-4 sm:p-6 mb-8 space-y-4 bg-gray-900 rounded-xl"
          >
            <input
              type="text"
              value={newThread.title}
              onChange={(e) =>
                setNewThread({ ...newThread, title: e.target.value })
              }
              placeholder="Thread title"
              className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <textarea
              value={newThread.content}
              onChange={(e) =>
                setNewThread({ ...newThread, content: e.target.value })
              }
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-2">
              <button
                type="button"
                onClick={() => setShowNewThread(false)}
                className="w-full sm:w-auto px-4 py-2 text-gray-300 bg-gray-800 rounded-xl hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 text-white bg-blue-500 rounded-xl hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </form>
        )}

        <InfinitePostsList
          posts={allPosts}
          user={user}
          club={club}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </section>
  );
}
