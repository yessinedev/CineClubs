package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.CommentDTO;
import com.tuniclubs.app.dto.PostDTO;
import com.tuniclubs.app.services.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{postId}")
    public CommentDTO createComment(
            @PathVariable Long postId,
            @RequestParam String userId,
            @RequestParam String content,
            @RequestParam(required = false) Long parentCommentId) {
        return commentService.createComment(postId, userId, content, parentCommentId);
    }

    @GetMapping("/{postId}")
    public List<CommentDTO> getCommentsForPost(@PathVariable Long postId, @RequestParam(required = false) String userId) {
        return commentService.getCommentsForPost(postId, userId);
    }

    @GetMapping("/comment/{commentId}")
    public CommentDTO getCommentById(@PathVariable Long commentId) {
        return commentService.getCommentById(commentId);
    }

    @PutMapping("/{commentId}")
    public CommentDTO updateComment(@PathVariable Long commentId, @RequestParam String content) {
        return commentService.updateComment(commentId, content);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

    @PostMapping("/{commentId}/like")
    public ResponseEntity<CommentDTO> likeComment(@PathVariable Long commentId, @RequestParam String userId) {
        CommentDTO comment = commentService.likeComment(commentId, userId);
        return ResponseEntity.ok(comment);
    }

    @PostMapping("/{commentId}/unlike")
    public ResponseEntity<CommentDTO> unlikeComment(@PathVariable Long commentId, @RequestParam String userId) {
        CommentDTO comment = commentService.unlikecomment(commentId, userId);
        return ResponseEntity.ok(comment);
    }
}
