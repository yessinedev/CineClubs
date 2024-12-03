import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/services/postService";
import { showToast } from "@/lib/toast";

export function EditPostDialog({ isOpen, onClose, post }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const queryClient = useQueryClient();

  const { mutateAsync: updatePostMutation } = useMutation({
    mutationFn: () => updatePost(post.id, { title, content }, post.authorId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", post.id, post.authorId]);
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await showToast.promise(updatePostMutation(), {
        loading: "Updating post...",
        success: "Post updated successfully!",
        error: (err) => err?.message || "Failed to update post",
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className="!rounded-[8px] sm:!rounded-[8px] bg-gray-900 border-none p-0 sm:max-w-[600px] overflow-hidden"
      >
        <DialogClose className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-700 hover:cursor-pointer transition-colors group">
          <span className="sr-only">Close</span>
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </DialogClose>

        <div className="p-4">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold text-white">
              Edit post
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="min-w-[70px] px-3 py-2 rounded-[6px] font-semibold text-[15px] text-blue-500 hover:bg-gray-700 hover:text-blue-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim()}
                className={`min-w-[70px] px-3 py-2 rounded-[6px] font-semibold text-[15px] text-white transition-colors ${
                  !title.trim() || !content.trim()
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
