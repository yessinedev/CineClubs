import React from "react";
import { useInView } from "react-intersection-observer";
import DiscussionThread from "./DiscussionThread";
import PostSkeleton from "./PostSkeleton";

export default function InfinitePostsList({
  posts,
  user,
  club,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isLoading,
}) {
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Show skeletons on initial load
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts && posts.length > 0 && posts.map((post) => (
        <DiscussionThread key={post.id} post={post} user={user} clubOwner={club.ownerId} />
      ))}

      {isFetchingNextPage && <PostSkeleton />}

      {/* Invisible load more trigger */}
      <div ref={ref} className="h-px" aria-hidden="true" />
    </div>
  );
}
