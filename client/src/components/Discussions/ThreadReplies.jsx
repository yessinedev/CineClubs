import { Heart, MoreHorizontal } from 'lucide-react';
import { addComment, getCommentsForPost } from '@/services/commentService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatCreatedAt } from '@/lib/dateUtils';
import { useState } from 'react';

export default function ThreadReplies({ postId, userId }) {
  const [newComment, setNewComment] = useState('');

  const { data: postComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsForPost(postId),
  });

  const queryClient = useQueryClient();

  const { mutate: addCommentMutation } = useMutation({
    mutationFn: ({postId, userId, content}) => addComment(postId, userId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId, userId]);
    },
    onError: (error) => {
      console.error("Failed to create the comment:", error);
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Handle reply submission
    console.log(newComment, postId, userId)
    addCommentMutation({
      postId: postId,
      userId: userId,
      content: newComment
    })
    setNewComment('');
  };

  return (
    <div className="pt-3 sm:pt-4 space-y-3 sm:space-y-4">
      <form onSubmit={handleSubmitComment} className="space-y-2 sm:space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a reply..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          rows={3}
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-3 sm:space-y-4">
        {postComments && postComments.map((comment) => (
          <div key={comment.id} className="flex p-3 sm:p-4 space-x-2 sm:space-x-3 rounded-lg bg-gray-800/50">
            <img
              src={comment.authorImage}
              alt={comment.authorName}
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="flex-1 space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-medium text-sm sm:text-base text-white">{comment.authorName}</span>
                  <span className="text-xs sm:text-sm text-gray-400 sm:ml-2">{formatCreatedAt(comment.createdAt)}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm sm:text-base text-gray-300">{comment.content}</p>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-pink-500">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{comment.likeCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

