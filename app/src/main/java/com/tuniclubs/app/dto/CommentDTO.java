package com.tuniclubs.app.dto;

import com.tuniclubs.app.models.Comment;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CommentDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String authorName; // The name or identifier of the author
    private String authorImage;
    private Long postId; // The ID of the post the comment belongs to (if applicable)
    private Long parentCommentId; // The ID of the parent comment (if it's a reply)
    private List<CommentDTO> replies; // Nested replies
    private int likesCount; // Number of likes on the comment
    private boolean hasLiked;

    public CommentDTO() {
    }

    public CommentDTO(Comment comment, String currentUserId) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.authorName = comment.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName();
        this.authorImage = comment.getAuthor().getImageUrl();
        this.postId = comment.getPost().getId();
        this.parentCommentId = comment.getParentComment() != null ? comment.getParentComment().getId() : null;
        this.likesCount = comment.getLikes() != null ? comment.getLikes().size() : 0;

        this.hasLiked = comment.getLikes() != null &&
                comment.getLikes().stream().anyMatch(user -> user.getUserId().equals(currentUserId));
    }

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.authorName = comment.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName();
        this.authorImage = comment.getAuthor().getImageUrl();
        this.postId = comment.getPost().getId();
        this.parentCommentId = comment.getParentComment() != null ? comment.getParentComment().getId() : null;
        this.likesCount = comment.getLikes() != null ? comment.getLikes().size() : 0;

        this.hasLiked = false;
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

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likeCount) {
        this.likesCount = likeCount;
    }

    public String getAuthorImage() {
        return authorImage;
    }

    public void setAuthorImage(String authorImage) {
        this.authorImage = authorImage;
    }

    public boolean isHasLiked() {
        return hasLiked;
    }

    public void setHasLiked(boolean hasLiked) {
        this.hasLiked = hasLiked;
    }
}
