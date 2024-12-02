import { useSearchParams } from "react-router-dom";
import { Users2, Blocks, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { joinClub, leaveClub } from "@/services/clubService";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "all";
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: { clubs = [], users = [] },
    isLoading,
  } = useSearchResults(query, filter);

  const handleFilterChange = (newFilter) => {
    setSearchParams((prev) => {
      prev.set("filter", newFilter);
      return prev;
    });
  };

  const FilterButton = ({ value, icon: Icon, children }) => (
    <button
      onClick={() => handleFilterChange(value)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-800/50 rounded-lg transition-colors",
        filter === value && "bg-gray-800/50"
      )}
    >
      <Icon className="w-5 h-5 text-gray-400" />
      <span>{children}</span>
    </button>
  );

  const NoResults = () => (
    <div className="text-center py-8 bg-gray-900/50 rounded-xl border border-gray-800">
      <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
    </div>
  );

  const LoadingState = () => (
    <div className="text-center py-8 bg-gray-900/50 rounded-xl border border-gray-800">
      <p className="text-gray-400">Searching...</p>
    </div>
  );

  const isMember = (club, userId) => {
    return club.members?.some((member) => member.userId === userId);;
  };

  const { mutate: joinClubMutation, isLoading:isJoining} = useMutation({
    mutationFn: ({ userId, clubId }) => joinClub(userId, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries(["club"]);
    },
    onError: (error) => {
      console.error("Failed to join the club:", error);
    },
  });

  const { mutate: leaveClubMutation, isLoading:isLeaving} = useMutation({
    mutationFn: ({ userId, clubId }) => leaveClub(userId, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries(["club"]);
    },
    onError: (error) => {
      console.error("Failed to leave the club:", error);
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="lg:flex gap-6">
        {/* Mobile Filters */}
        <div className="lg:hidden mb-6">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-2">
            <div className="flex gap-2">
              <FilterButton value="all" icon={LayoutGrid}>
                All
              </FilterButton>
              <FilterButton value="users" icon={Users2}>
                People
              </FilterButton>
              <FilterButton value="clubs" icon={Blocks}>
                Communities
              </FilterButton>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white">Filters</h2>
            </div>
            <div className="p-2 flex flex-col gap-1">
              <FilterButton value="all" icon={LayoutGrid}>
                All Results
              </FilterButton>
              <FilterButton value="users" icon={Users2}>
                People
              </FilterButton>
              <FilterButton value="clubs" icon={Blocks}>
                Communities
              </FilterButton>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white">
              Search results for &quot;
              <span className="text-blue-400">{query}</span>&quot;
            </h1>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {/* People Section */}
              {(filter === "all" || filter === "users") && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Users2 className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-semibold text-white">People</h2>
                  </div>
                  {users.length > 0 ? (
                    <div className="grid gap-4">
                      {users.map((user) => (
                        <div
                          key={user.userId}
                          className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                        >
                          <img
                            src={user.imageUrl}
                            alt={user.username}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate">
                              {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-sm text-gray-400 truncate">
                              @{user.username}
                            </p>
                            {user.role && (
                              <p className="text-sm text-gray-500 truncate">
                                {user.role}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-sm text-white rounded-xl transition-colors">
                              Follow
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <NoResults />
                  )}
                </div>
              )}

              {/* Communities Section */}
              {(filter === "all" || filter === "clubs") && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Blocks className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-semibold text-white">
                      Communities
                    </h2>
                  </div>
                  {clubs.length > 0 ? (
                    <div className="grid gap-3 sm:gap-4">
                    {clubs.map((club) => (
                      <div
                        key={club.id}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                      >
                        <img
                          src={club.imageUrl}
                          alt={club.name}
                          className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded-lg sm:flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg sm:text-base text-white font-medium truncate mb-1 sm:mb-0">
                              {club.name}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                              {club.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs sm:text-sm mb-3 sm:mb-0">
                              <span className="text-blue-400">
                                {club.category || "Community"}
                              </span>
                              <span className="text-gray-500">
                                {club.membersCount.toLocaleString()} members
                              </span>
                            </div>
                          </div>
                          {isSignedIn ? (
                            isMember(club, user.id) ? (
                              <button
                                onClick={() =>
                                  leaveClubMutation({
                                    userId: user.id,
                                    clubId: club.id,
                                  })
                                }
                                disabled={isLeaving}
                                className="w-full px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
                              >
                                Leave Club
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  joinClubMutation({
                                    userId: user.id,
                                    clubId: club.id,
                                  })
                                }
                                disabled={isJoining}
                                className="w-full px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
                              >
                                Join Club
                              </button>
                            )
                          ) : (
                            <SignInButton mode="modal">
                              <button className="w-full px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
                                Join Club
                              </button>
                            </SignInButton>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  
                  ) : (
                    <NoResults />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
