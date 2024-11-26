import apiClient from "./apiClient";

export const fetchUserProfile = async (userId, includePosts, includeJoinedClubs) => {
    const {data} = await apiClient.get(`/users/${userId}?includePosts=${includePosts}&includeJoinedClubs=${includeJoinedClubs}`);
    return data;
}