import React from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import { addComment, getCommentsForPost } from '@/services/commentService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatCreatedAt } from '@/lib/dateUtils';





export default function ThreadReplies({ postId, userId }) {
  const [newComment, setNewComment] = React.useState('');

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
    <div className="pt-4 space-y-4">
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a reply..."
          className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {postComments && postComments.map((comment) => (
          <div key={comment.id} className="flex p-4 space-x-3 rounded-lg bg-gray-800/50">
            <img
              src={comment.authorImage}
              alt={comment.authorName}
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-white">{comment.authorName}</span>
                  <span className="ml-2 text-sm text-gray-400">{formatCreatedAt(comment.createdAt)}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-1 text-gray-300">{comment.content}</p>
              <button className="flex items-center mt-2 space-x-1 text-gray-400 hover:text-pink-500">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{comment.likeCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}