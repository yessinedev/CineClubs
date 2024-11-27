package com.cineclubs.app.controllers;

import com.cineclubs.app.dto.CommentDTO;
import com.cineclubs.app.services.CommentService;
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
    public List<CommentDTO> getCommentsForPost(@PathVariable Long postId) {
        return commentService.getCommentsForPost(postId);
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
}
