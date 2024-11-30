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

export const quickSearchUsers = async (query) => {
  if (!query?.trim()) return [];
  const { data } = await apiClient.get(
    `/users/quick-search?query=${encodeURIComponent(query)}`
  );
  return data;
};

export const searchUsers = async (query) => {
  if (!query?.trim()) return [];
  const { data } = await apiClient.get(
    `/users/search?query=${encodeURIComponent(query)}`
  );
  return data;
};
