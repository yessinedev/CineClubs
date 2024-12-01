import { useQuery } from "@tanstack/react-query";
import { searchClubs } from "../services/clubService";
import { searchUsers } from "../services/userService";

export function useSearchResults(query, filter = "all") {
  const clubsQuery = useQuery({
    queryKey: ["searchClubs", query],
    queryFn: () => searchClubs(query),
    enabled: Boolean(query?.trim()) && (filter === "all" || filter === "clubs"),
    staleTime: 1000 * 60 * 5,
    placeholderData: [],
  });

  const usersQuery = useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => searchUsers(query),
    enabled: Boolean(query?.trim()) && (filter === "all" || filter === "users"),
    staleTime: 1000 * 60 * 5,
    placeholderData: [],
  });

  // Combine the loading states
  const isLoading =
    (filter === "all" && (clubsQuery.isLoading || usersQuery.isLoading)) ||
    (filter === "clubs" && clubsQuery.isLoading) ||
    (filter === "users" && usersQuery.isLoading);

  // Return appropriate data based on filter
  const data = {
    clubs: filter === "users" ? [] : clubsQuery.data || [],
    users: filter === "clubs" ? [] : usersQuery.data || [],
  };

  return {
    data,
    isLoading,
    isError: clubsQuery.isError || usersQuery.isError,
  };
}
