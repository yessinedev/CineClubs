package com.cineclubs.app.controllers;

import com.cineclubs.app.dto.PostDTO;
import com.cineclubs.app.models.Post;
import com.cineclubs.app.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        PostDTO createdPost = postService.createPost(clubId, userId, post);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<PostDTO>> getPostsByClub(
            @PathVariable Long clubId,
            @RequestParam(required = false) String userId) {
        List<PostDTO> posts = postService.getPostsForClub(clubId, userId);
        return ResponseEntity.ok(posts);
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
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}
