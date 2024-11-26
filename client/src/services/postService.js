import apiClient from "./apiClient";

export const likePost = async (postId, userId) => {
  return await apiClient.post(`/posts/${postId}/like?userId=${userId}`);
};

export const unlikePost = async (postId, userId) => {
  return await apiClient.post(`/posts/${postId}/unlike?userId=${userId}`);
};

export const fetchClubPosts = async (clubId, userId) => {
  const { data } = await apiClient.get(
    `/posts/club/${clubId}?userId=${userId}`
  );
  return data;
};

export const createPost = async (post, userId, clubId) => {
  try {
    console.log("Creating post:", post);
    const { data } = await apiClient.post(
      `/posts?userId=${userId}&clubId=${clubId}`,
      { title: post.title, content: post.content }
    );
    console.log("Post created successfully:", data);
    return data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw error;
  }
};
