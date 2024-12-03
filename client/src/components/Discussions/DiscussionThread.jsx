import {
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Trash2,
  PencilLine,
  Flag,
  BookmarkPlus,
} from "lucide-react";
import { deletePost, likePost, unlikePost } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCreatedAt } from "@/lib/dateUtils";
import ThreadReplies from "./ThreadReplies";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { showToast } from "@/lib/toast";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { EditPostDialog } from "./EditPostDialog";

export default function DiscussionThread({
  post,
  user,
  isExpanded = false,
  clubOwner,
}) {
  const [expanded, setExpanded] = useState(isExpanded);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: likePostMutation } = useMutation({
    mutationFn: () => likePost(post.id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id, user.id]);
    },
    onError: (error) => {
      console.error("Failed to like the post:", error);
    },
  });

  const { mutate: unlikePostMutation } = useMutation({
    mutationFn: () => unlikePost(post.id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id, user.id]);
    },
    onError: (error) => {
      console.error("Failed to unlike the post:", error);
    },
  });

  const { mutateAsync: deletePostMutation } = useMutation({
    mutationFn: () => deletePost(post.id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id, user.id]);
    },
    onError: (error) => {
      console.error("Failed to like the post:", error);
    },
  });

  const handleDeletePost = async () => {
    try {
      await showToast.promise(deletePostMutation(), {
        loading: "Deleting your post...",
        success: "Post deleted successfully!",
        error: (err) => err?.message || "Failed to delete post",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  return (
    <>
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
                  className="self-end sm:self-auto w-9 h-9 p-0 relative hover:bg-gray-700/20 rounded-full transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-400 mx-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-gray-900 border border-gray-800 shadow-[0_2px_12px_0_rgba(0,0,0,0.5)] mt-2"
                align="end"
              >
                {user.id === post.authorId && (
                  <DropdownMenuItem
                    className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer"
                    onClick={() => setShowEditDialog(true)}
                  >
                    <PencilLine className="w-4 h-4 mr-2" />
                    Edit post
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save post
                </DropdownMenuItem>

                {user.id === post.authorId && (
                  <>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem
                      className="flex items-center px-3 py-2.5 text-sm text-red-400 hover:bg-gray-800 cursor-pointer"
                      onClick={handleDeleteClick}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete post
                    </DropdownMenuItem>
                  </>
                )}

                {user.id !== post.authorId && (
                  <>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="flex items-center px-3 py-2.5 text-sm text-red-400 hover:bg-gray-800 cursor-pointer">
                      <Flag className="w-4 h-4 mr-2" />
                      Report post
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
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

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeletePost}
        title="Permanently delete post?"
        description="Deleting this post will also delete all the associated reactions and comments. This can't be undone. If you need a record of the content, take a screenshot before deleting it."
      />

      <EditPostDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        post={post}
      />
    </>
  );
}
