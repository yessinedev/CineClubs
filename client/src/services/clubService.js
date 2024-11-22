import axios from "axios";

export const fetchClubs = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await axios.get("http://localhost:8080/api/clubs");
  return data;
};
