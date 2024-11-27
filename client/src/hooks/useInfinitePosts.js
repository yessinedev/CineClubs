import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchClubPosts } from "@/services/postService";

export function useInfinitePosts({ clubId, userId }) {
  return useInfiniteQuery({
    queryKey: ["posts", clubId, userId],
    queryFn: ({ pageParam }) =>
      fetchClubPosts({
        clubId,
        userId,
        cursor: pageParam,
        limit: 10,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    getPreviousPageParam: () => undefined,
  });
}
