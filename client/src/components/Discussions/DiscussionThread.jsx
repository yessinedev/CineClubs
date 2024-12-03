import { MessageCircle, Heart, Share2, MoreHorizontal } from "lucide-react";
import { likePost, unlikePost } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCreatedAt } from "@/lib/dateUtils";
import ThreadReplies from "./ThreadReplies";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";

export default function DiscussionThread({
  post,
  user,
  isExpanded = false,
  clubOwner,
}) {
  const [expanded, setExpanded] = useState(isExpanded);

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
    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-900 border border-gray-800 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center space-x-3">
          <img
            src={post.authorImageUrl}
            alt={post.authorName}
            className="object-cover w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-white">{post.authorName}</h3>
            <span className="text-xs sm:text-sm text-gray-400">
              {formatCreatedAt(post.createdAt)}
            </span>
          </div>
        </div>
        {user.id === post.authorId || user.id === clubOwner ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="self-end sm:self-auto text-gray-400 hover:text-white"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user.id === post.authorId && (
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => console.log({ edit: post })}
                  >
                    <Pencil />
                    Edit
                  </Button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="px-0"
                  onClick={() => console.log({ delete: post })}
                >
                  <Trash />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <></>
        )}
      </div>

      <div>
        <h2 className="mb-2 text-lg sm:text-xl font-semibold text-white">
          {post.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-300">{post.content}</p>
      </div>

      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={
              post.hasLiked
                ? () => unlikePostMutation()
                : () => likePostMutation()
            }
            className={`flex items-center space-x-1 sm:space-x-1.5 ${
              post.hasLiked
                ? "text-pink-500"
                : "text-gray-400 hover:text-pink-500"
            }`}
          >
            <Heart
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill={post.hasLiked ? "currentColor" : "none"}
            />
            <span className="text-sm sm:text-base">{post.likesCount}</span>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 sm:space-x-1.5 text-gray-400 hover:text-white"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">{post.commentsCount}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {expanded && <ThreadReplies postId={post.id} userId={user.id} />}
    </div>
  );
}
