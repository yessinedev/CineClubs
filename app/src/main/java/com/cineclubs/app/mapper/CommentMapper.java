package com.cineclubs.app.mapper;

import com.cineclubs.app.dto.CommentDTO;
import com.cineclubs.app.models.Comment;

import java.util.List;
import java.util.stream.Collectors;

public class CommentMapper {

    public static CommentDTO toDTO(Comment comment) {
        return new CommentDTO(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName(), // Adjust field based on `User` structure
                comment.getPost() != null ? comment.getPost().getId() : null,
                comment.getParentComment() != null ? comment.getParentComment().getId() : null,
                comment.getReplies() != null
                        ? comment.getReplies().stream().map(CommentMapper::toDTO).collect(Collectors.toList())
                        : null,
                comment.getLikes() != null ? comment.getLikes().size() : 0
        );
    }
}
