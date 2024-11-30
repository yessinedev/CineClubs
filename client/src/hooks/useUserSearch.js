import { useQuery } from "@tanstack/react-query";
import { quickSearchUsers } from "../services/userService";
import { useDebounce } from "./useDebounce";

export function useUserSearch(searchQuery) {
  const debouncedQuery = useDebounce(searchQuery, 300);

  return useQuery({
    queryKey: ["userQuickSearch", debouncedQuery],
    queryFn: () => quickSearchUsers(debouncedQuery),
    enabled: Boolean(debouncedQuery),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    placeholderData: [], // Show empty array while loading
  });
}
