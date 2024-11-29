package com.cineclubs.app.mapper;

import com.cineclubs.app.dto.CommentDTO;
import com.cineclubs.app.models.Comment;

import java.util.List;
import java.util.stream.Collectors;

public class CommentMapper {

    public static CommentDTO toDTO(Comment comment, String userId) {
        return new CommentDTO(
                comment,
                userId
        );
    }

    public static CommentDTO toDTO(Comment comment) {
        return new CommentDTO(comment);
    }
}
