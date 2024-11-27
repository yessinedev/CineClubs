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

export const getCommentsForPost = async (postId) => {
    try {
        const { data } = await apiClient.get(`/comments/${postId}`,);
        return data;
    } catch (error) {
        throw error;
    }
}