package com.cineclubs.app.services;

import com.cineclubs.app.models.Club;
import com.cineclubs.app.models.Post;
import com.cineclubs.app.models.User;
import com.cineclubs.app.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserService userService;
    private final ClubService clubService;
    private final SimpMessagingTemplate messagingTemplate;

    // Create a new post
    public Post createPost(Long clubId, String userId, Post post) {
        User author = userService.getUserByClerkId(userId);
        Club club = clubService.getClubById(clubId);

        post.setAuthor(author);
        post.setClub(club);
        Post savedPost = postRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", savedPost);
        return savedPost;
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
    }

    public List<Post> getPostsForClub(Long clubId) {
        return postRepository.findByClubId(clubId);
    }

    public List<Post> getPostsForUser(String clerkId){
        return postRepository.findByAuthorClerkId(clerkId);
    }

    // Like a post
    public Post likePost(Long postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        User user = userService.getUserByClerkId(userId);

        post.getLikes().add(user);
        Post likedPost = postRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", likedPost);
        return likedPost;
    }

    // Unlike a post
    public Post unlikePost(Long postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        User user = userService.getUserByClerkId(userId);
        post.getLikes().remove(user);
        Post unlikedPost = postRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", unlikedPost);
        return unlikedPost;
    }

    // Delete a post
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }


}
