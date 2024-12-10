package com.tuniclubs.app.services;

import com.tuniclubs.app.dto.CommentDTO;
import com.tuniclubs.app.dto.PostDTO;
import com.tuniclubs.app.mapper.CommentMapper;
import com.tuniclubs.app.models.Comment;
import com.tuniclubs.app.models.Post;
import com.tuniclubs.app.models.User;
import com.tuniclubs.app.repository.CommentRepository;
import com.tuniclubs.app.repository.PostRepository;
import com.tuniclubs.app.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository, UserService userService, SimpMessagingTemplate messagingTemplate) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
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
    public List<CommentDTO> getCommentsForPost(Long postId, String userId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(comment -> CommentMapper.toDTO(comment, userId))
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

    public CommentDTO likeComment(Long commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        User user = userService.getUserByUserId(userId);

        comment.getLikes().add(user);
        Comment likedComment = commentRepository.save(comment);
        CommentDTO commentDTO = new CommentDTO(likedComment, userId);
        commentDTO.setHasLiked(true);
        messagingTemplate.convertAndSend("/topic/comments", commentDTO);

        return commentDTO;
    }

    public CommentDTO unlikecomment(Long commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        User user = userService.getUserByUserId(userId);
        comment.getLikes().remove(user);
        Comment unlikedComment = commentRepository.save(comment);
        CommentDTO commentDTO = new CommentDTO(unlikedComment, userId);
        messagingTemplate.convertAndSend("/topic/comments", commentDTO);
        return commentDTO;
    }
}
