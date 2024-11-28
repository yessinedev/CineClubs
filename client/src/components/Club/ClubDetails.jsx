import { joinClub, leaveClub } from "@/services/clubService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Film, MessageCircle, Star, Users } from "lucide-react";
import ProfilePictureModal from "../Profile/ProfilePictureModal";

export default function ClubDetails({ club, isMember, user }) {
  const queryClient = useQueryClient();
  // Mutation to join a club
  const { mutate: joinClubMutation, isLoading: isJoining } = useMutation({
    mutationFn: () => joinClub(user.id, club.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["club", club.id]); // Refetch club details
    },
    onError: (error) => {
      console.error("Failed to join the club:", error);
    },
  });

  // Mutation to leave a club
  const { mutate: leaveClubMutation, isLoading: isLeaving } = useMutation({
    mutationFn: () => leaveClub(user.id, club.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["club", club.id]); // Refetch club details
    },
    onError: (error) => {
      console.error("Failed to leave the club:", error);
    },
  });
  return (
    <div className="p-6 bg-gray-900 border border-gray-800 shadow-xl rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="mb-2 text-3xl font-bold text-white">{club.name}</h1>
            <ProfilePictureModal modalTitle="Change your community banner image" />
          </div>
          <p className="mb-6 text-gray-400">{club.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
            <div className="p-3 rounded-xl bg-gray-800/50">
              <div className="flex items-center mb-1 text-blue-500">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">Members</span>
              </div>
              <span className="text-xl font-semibold text-white">
                {club.membersCount}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-800/50">
              <div className="flex items-center mb-1 text-blue-500">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">Discussions</span>
              </div>
              <span className="text-xl font-semibold text-white">
                {club.posts != null ? club.posts.length : 0}
              </span>
            </div>

            {/* <div className="p-3 rounded-xl bg-gray-800/50">
              <div className="flex items-center mb-1 text-purple-400">
                <Film className="w-4 h-4 mr-1" />
                <span className="text-sm">Movies</span>
              </div>
              <span className="text-xl font-semibold text-white">156</span>
            </div>
            
            <div className="p-3 rounded-xl bg-gray-800/50">
              <div className="flex items-center mb-1 text-purple-400">
                <Star className="w-4 h-4 mr-1" />
                <span className="text-sm">Rating</span>
              </div>
              <span className="text-xl font-semibold text-white">4.9</span>
            </div> */}
          </div>
        </div>
        {isMember ? (
          <button
            onClick={() => leaveClubMutation()}
            disabled={isLeaving}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-colors"
          >
            Leave Club
          </button>
        ) : (
          <button
            onClick={() => joinClubMutation()}
            disabled={isJoining}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-colors"
          >
            Join Club
          </button>
        )}
      </div>
    </div>
  );
}
