package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.CreatePostRequest;
import com.tuniclubs.app.dto.PageRequest;
import com.tuniclubs.app.dto.PageResponse;
import com.tuniclubs.app.dto.PostDTO;
import com.tuniclubs.app.exceptions.UnauthorizedActionException;
import com.tuniclubs.app.exceptions.ValidationException;
import com.tuniclubs.app.models.Post;
import com.tuniclubs.app.services.PostService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/posts")
@Tag(name = "Posts", description = "Post management endpoints")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    @Operation(summary = "Create new post")
    @ApiResponse(responseCode = "200", description = "Post created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "403", description = "Not authorized")
    public ResponseEntity<PostDTO> createPost(
            @Parameter(description = "Club ID", required = true) @RequestParam Long clubId,

            @Parameter(description = "User ID", required = true) @RequestParam String userId,

            @Valid @RequestBody CreatePostRequest request) {
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        return ResponseEntity.ok(postService.createPost(clubId, userId, post));
    }

    @GetMapping("/club/{clubId}")
    public ResponseEntity<PageResponse<PostDTO>> getPostsByClub(
            @PathVariable Long clubId,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(required = false, defaultValue = "10") int limit) {

        PageRequest pageRequest = new PageRequest();
        pageRequest.setCursor(cursor);
        pageRequest.setLimit(limit);

        PageResponse<PostDTO> response = postService.getPostsForClub(clubId, userId, pageRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPostById(
            @PathVariable Long postId,
            @RequestParam String userId) {
        PostDTO post = postService.getPostById(postId, userId);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<PostDTO> likePost(@PathVariable Long postId, @RequestParam String userId) {
        PostDTO post = postService.likePost(postId, userId);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<PostDTO> unlikePost(@PathVariable Long postId, @RequestParam String userId) {
        PostDTO post = postService.unlikePost(postId, userId);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId, @RequestParam String userId) {
        postService.deletePost(postId, userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostDTO> updatePost(
            @PathVariable Long postId,
            @RequestParam String userId,
            @RequestBody Post postDetails) {
        try {
            PostDTO updatedPost = postService.updatePost(postId, userId, postDetails);
            return ResponseEntity.ok(updatedPost);
        } catch (UnauthorizedActionException e) {
            return ResponseEntity.status(403).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ValidationException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
