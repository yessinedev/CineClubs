import axios from "axios"

export const fetchUserProfile = async (userId, includePosts, includeJoinedClubs) => {
    const {data} = await axios.get(`http://localhost:8080/api/users/${userId}?includePosts=${includePosts}&includeJoinedClubs=${includeJoinedClubs}`);
    return data;
}