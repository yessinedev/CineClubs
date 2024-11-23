import axios from "axios";

export const fetchClubs = async () => {
  const { data } = await axios.get("http://localhost:8080/api/clubs");
  return data;
};

export const fetchClub = async (id) => {
  const { data } = await axios.get(`http://localhost:8080/api/clubs/${id}`);
  return data;
};

export const joinClub = async (clerkId, clubId) => {
 
  const { data } = await axios.post(`http://localhost:8080/api/clubs/join?clerkId=${clerkId}&clubId=${clubId}`);
  return data;
}

export const leaveClub = async (clerkId, clubId) => {
  const { data } = await axios.put(`http://localhost:8080/api/clubs/leave?clerkId=${clerkId}&clubId=${clubId}`);
  return data;
}

