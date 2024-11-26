import React from "react";
import { MessageCircle, Heart, Share2, MoreHorizontal } from "lucide-react";
import { likePost, unlikePost } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCreatedAt } from "@/lib/dateUtils";
import ThreadReplies from "./ThreadReplies";

export default function DiscussionThread({ post, user, isExpanded = false }) {
  const [expanded, setExpanded] = React.useState(isExpanded);

  const queryClient = useQueryClient();

  const { mutate: likePostMutation } = useMutation({
    mutationFn: () => likePost(post.id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id, user.id]); // Refetch club details
    },
    onError: (error) => {
      console.error("Failed to like the post:", error);
    },
  });

  const { mutate: unlikePostMutation } = useMutation({
    mutationFn: () => unlikePost(post.id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id, user.id]); // Refetch club details
    },
    onError: (error) => {
      console.error("Failed to unlike the post:", error);
    },
  });

  return (
    <div className="p-6 space-y-4 bg-gray-900 border border-gray-800 rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.authorImageUrl}
            alt={post.authorName}
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-white">{post.authorName}</h3>
            <span className="text-sm text-gray-400">
              {formatCreatedAt(post.createdAt)}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold text-white">{post.title}</h2>
        <p className="text-gray-300">{post.content}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={
              post.hasLiked
                ? () => unlikePostMutation()
                : () => likePostMutation()
            }
            className={`flex items-center space-x-1.5 ${
              post.hasLiked
                ? "text-pink-500"
                : "text-gray-400 hover:text-pink-500"
            }`}
          >
            <Heart
              className="w-5 h-5"
              fill={post.hasLiked ? "currentColor" : "none"}
            />
            <span>{post.likesCount}</span>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-white"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.commentsCount}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {expanded && <ThreadReplies postId={post.id} userId={user.id} />}
    </div>
  );
}
