import apiClient from "./apiClient";

export const fetchUserProfile = async (
  userId,
  includePosts,
  includeJoinedClubs
) => {
  const { data } = await apiClient.get(
    `/users/${userId}?includePosts=${includePosts}&includeJoinedClubs=${includeJoinedClubs}`
  );
  return data;
};

export const updateProfilePicture = async (userId, imageUrl) => {
  const { data } = await apiClient.put(`/users/change/${userId}`, imageUrl, {
    headers: { "Content-Type": "text/plain" },
  });
  return data;
};
