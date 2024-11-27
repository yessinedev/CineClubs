import apiClient from "./apiClient";

export const createClub = async (userId, club) => {
  try {
    const { data } = await apiClient.post(`/clubs?userId=${userId}`, club);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchClubs = async () => {
  const { data } = await apiClient.get("/clubs");
  return data;
};

export const fetchClub = async (id, includeMembers) => {
  const { data } = await apiClient.get(
    `/clubs/${id}?includeMembers=${includeMembers}`
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
