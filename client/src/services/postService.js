import axios from "axios"

export const likePost = async (postId, userId) => {
    return await axios.post(`http://localhost:8080/api/posts/${postId}/like?userId=${userId}`)
}

export const unlikePost = async (postId, userId) => {
    return await axios.post(`http://localhost:8080/api/posts/${postId}/unlike?userId=${userId}`)
}

export const fetchClubPosts = async(clubId, userId) => {
    const {data} = await axios.get(`http://localhost:8080/api/posts/club/${clubId}?userId=${userId}`)
    return data;
}

export const createPost = async (post, userId, clubId) => {
    try {
      console.log("Creating post:", post);
      const { data } = await axios.post(
        `http://localhost:8080/api/posts?userId=${userId}&clubId=${clubId}`,
        { title: post.title, content: post.content }
      );
      console.log("Post created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      throw error;
    }
  };
  