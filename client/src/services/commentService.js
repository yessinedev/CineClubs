import apiClient from "./apiClient";


export const addComment = async (postId, userId, content) => {
    try {
      const { data } = await apiClient.post(`/comments/${postId}?userId=${userId}&content=${content}`,);
      return data;
    } catch (error) {
      console.error(
        "Error creating comment:",
        error.response?.data || error.message
      );
      throw error;
    }
};

export const getCommentsForPost = async (postId, userId) => {
    try {
        const { data } = await apiClient.get(`/comments/${postId}?userId=${userId}`,);
        return data;
    } catch (error) {
        throw error;
    }
}

export const likeComment = async (commentId, userId) => {
  return await apiClient.post(`/comments/${commentId}/like?userId=${userId}`);
};

export const unlikeComment = async (commentId, userId) => {
  return await apiClient.post(`/comments/${commentId}/unlike?userId=${userId}`);
};