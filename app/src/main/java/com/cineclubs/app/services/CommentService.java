package com.cineclubs.app.services;

import com.cineclubs.app.dto.CommentDTO;
import com.cineclubs.app.mapper.CommentMapper;
import com.cineclubs.app.models.Comment;
import com.cineclubs.app.models.Post;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.CommentRepository;
import com.cineclubs.app.repository.PostRepository;
import com.cineclubs.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // Create a new comment
    public CommentDTO createComment(Long postId, String userId, String content, Long parentCommentId) {
        Optional<Post> post = postRepository.findById(postId);
        Optional<User> user = userRepository.findById(userId);

        if (post.isEmpty()) {
            throw new IllegalArgumentException("Post not found");
        }
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        Comment newComment = new Comment();
        newComment.setContent(content);
        newComment.setAuthor(user.get());
        newComment.setPost(post.get());

        if (parentCommentId != null) {
            Comment parentComment = commentRepository.findById(parentCommentId)
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
            newComment.setParentComment(parentComment);
        }

        Comment savedComment = commentRepository.save(newComment);
        return CommentMapper.toDTO(savedComment);
    }

    // Retrieve all comments for a specific post
    public List<CommentDTO> getCommentsForPost(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(CommentMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Retrieve a specific comment by its ID
    public CommentDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        return CommentMapper.toDTO(comment);
    }

    // Update a comment
    public CommentDTO updateComment(Long commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        comment.setContent(newContent);
        Comment updatedComment = commentRepository.save(comment);
        return CommentMapper.toDTO(updatedComment);
    }

    // Delete a comment
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        commentRepository.delete(comment);
    }
}
