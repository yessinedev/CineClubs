import apiClient from "./apiClient";

export const createClub = async (userId, club) => {
  try {
    const { data } = await apiClient.post(`/clubs?userId=${userId}`, club);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchClubs = async () => {
  const { data } = await apiClient.get("/clubs");
  return data;
};

export const fetchClub = async (identifier, includeMembers = false) => {
  const endpoint = isNaN(identifier)
    ? `/clubs/slug/${identifier}`
    : `/clubs/id/${identifier}`;

  const { data } = await apiClient.get(
    `${endpoint}?includeMembers=${includeMembers}`
  );
  return data;
};

export const joinClub = async (clerkId, clubId) => {
  const { data } = await apiClient.post(
    `/clubs/join?userId=${clerkId}&clubId=${clubId}`
  );
  return data;
};

export const leaveClub = async (clerkId, clubId) => {
  const { data } = await apiClient.put(
    `/clubs/leave?userId=${clerkId}&clubId=${clubId}`
  );
  return data;
};

export const fetchTotalClubsAndPosts = async () => {
  const { data } = await apiClient.get("/stats/summary");
  return data;
};

export const updateBanner = async (clubId, imageUrl) => {
  const { data } = await apiClient.put(`/clubs/banner/${clubId}`, imageUrl, {
    headers: { "Content-Type": "text/plain" },
  });
  return data;
};

export const quickSearchClubs = async (query) => {
  if (!query?.trim()) return [];
  const { data } = await apiClient.get(
    `/clubs/quick-search?query=${encodeURIComponent(query)}`
  );
  return data;
};

export const searchClubs = async (query) => {
  if (!query?.trim()) return [];
  const { data } = await apiClient.get(
    `/clubs/search?query=${encodeURIComponent(query)}`
  );
  return data;
};
