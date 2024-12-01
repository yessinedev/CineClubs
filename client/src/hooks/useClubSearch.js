import { useQuery } from "@tanstack/react-query";
import { quickSearchClubs } from "../services/clubService";
import { useDebounce } from "./useDebounce";

export function useClubSearch(searchQuery) {
  const debouncedQuery = useDebounce(searchQuery, 300);

  return useQuery({
    queryKey: ["clubQuickSearch", debouncedQuery],
    queryFn: () => quickSearchClubs(debouncedQuery),
    enabled: Boolean(debouncedQuery),
    staleTime: 1000 * 60 * 5,
    placeholderData: [],
  });
}
