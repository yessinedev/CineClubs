import { joinClub, leaveClub } from "@/services/clubService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Users } from "lucide-react";
import ProfilePictureModal from "../Profile/ProfilePictureModal";
import { SignInButton, useUser } from "@clerk/clerk-react";

export default function ClubDetails({ club, member }) {
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: joinClubMutation, isLoading: isJoining } = useMutation({
    mutationFn: () => joinClub(user.id, club.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["club", club.id]);
    },
    onError: (error) => {
      console.error("Failed to join the club:", error);
    },
  });

  const { mutate: leaveClubMutation, isLoading: isLeaving } = useMutation({
    mutationFn: () => leaveClub(user.id, club.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["club", club.id]);
    },
    onError: (error) => {
      console.error("Failed to leave the club:", error);
    },
  });

  const handleJoinClick = () => {
    if (!isSignedIn) return;
    joinClubMutation();
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 border border-gray-800 shadow-xl rounded-xl">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {club.name}
            </h1>
            {isSignedIn && member?.role === "ADMIN" && (
              <ProfilePictureModal
                modalTitle="Change your community banner image"
                id={club.id}
              />
            )}
          </div>
          <p className="mb-6 text-gray-400">{club.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
                {club.postsCount}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          {isSignedIn ? (
            member?.status === "APPROVED" ? (
              <button
                onClick={() => leaveClubMutation()}
                disabled={isLeaving}
                className="w-full sm:w-auto px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Leave Club
              </button>
            ) : member?.status === "PENDING" ? (
              <button
                onClick={() => leaveClubMutation()}
                disabled={isLeaving}
                className={`w-full sm:w-auto px-8 py-3 ${
                  member.status === "PENDING"
                    ? "bg-gray-400 hover:bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }  text-white rounded-xl flex items-center justify-center gap-2 transition-colors`}
              >
                Cancel Request
              </button>
            ) : (
              <button
                onClick={handleJoinClick}
                disabled={isJoining}
                className={`w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600text-white rounded-xl flex items-center justify-center gap-2 transition-colors`}
              >
                Join Club
              </button>
            )
          ) : (
            <SignInButton mode="modal">
              <button className="w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 transition-colors">
                Join Club
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
