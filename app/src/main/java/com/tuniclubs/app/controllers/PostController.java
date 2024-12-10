package com.tuniclubs.app.controllers;

import com.tuniclubs.app.dto.PageRequest;
import com.tuniclubs.app.dto.PageResponse;
import com.tuniclubs.app.dto.PostDTO;
import com.tuniclubs.app.exceptions.UnauthorizedActionException;
import com.tuniclubs.app.exceptions.ValidationException;
import com.tuniclubs.app.models.Post;
import com.tuniclubs.app.services.PostService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestParam Long clubId,
            @RequestParam String userId,
            @RequestBody Post post) {
        try {
            PostDTO createdPost = postService.createPost(clubId, userId, post);
            return ResponseEntity.ok(createdPost);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Only club members can create posts")) {
                return ResponseEntity.status(403).build();
            }
            throw e;
        }
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
