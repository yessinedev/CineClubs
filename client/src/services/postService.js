import axios from "axios"

export const likePost = async (postId, userId) => {
    return await axios.post(`http://localhost:8080/api/posts/${postId}/like?userId=${userId}`)
}

export const unlikePost = async (postId, userId) => {
    return await axios.post(`http://localhost:8080/api/posts/${postId}/unlike?userId=${userId}`)
}