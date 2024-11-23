package com.cineclubs.app.controllers;

import com.cineclubs.app.models.Post;
import com.cineclubs.app.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;

    // Create a new post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestParam Long clubId,
                                           @RequestParam String userId,
                                           @RequestBody Post post) {
        Post createdPost = postService.createPost(clubId, userId, post);
        return ResponseEntity.ok(createdPost);
    }

    // Get all posts for a club
    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<Post>> getPostsByClub(@PathVariable Long clubId) {
        List<Post> posts = postService.getPostsForClub(clubId);
        return ResponseEntity.ok(posts);
    }

    // Get a single post by ID
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        return ResponseEntity.ok(post);

    }

    // Like a post
    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, @RequestParam String userId) {
        Post post = postService.likePost(postId, userId);
        return ResponseEntity.ok(post);
    }

    // Unlike a post
    @PostMapping("/{postId}/unlike")
    public ResponseEntity<Post> unlikePost(@PathVariable Long postId, @RequestParam String userId) {
        Post post = postService.unlikePost(postId, userId);
        return ResponseEntity.ok(post);
    }

    // Delete a post
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}

