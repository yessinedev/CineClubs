package com.cineclubs.app.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CommentDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String authorName; // The name or identifier of the author
    private Long postId; // The ID of the post the comment belongs to (if applicable)
    private Long parentCommentId; // The ID of the parent comment (if it's a reply)
    private List<CommentDTO> replies; // Nested replies
    private int likeCount; // Number of likes on the comment

    public CommentDTO() {
    }

    public CommentDTO(Long id, String content, LocalDateTime createdAt, String authorName, Long postId, Long parentCommentId, List<CommentDTO> replies, int likeCount) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.authorName = authorName;
        this.postId = postId;
        this.parentCommentId = parentCommentId;
        this.replies = replies;
        this.likeCount = likeCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(Long parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public List<CommentDTO> getReplies() {
        return replies;
    }

    public void setReplies(List<CommentDTO> replies) {
        this.replies = replies;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}
