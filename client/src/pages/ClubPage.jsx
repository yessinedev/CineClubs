import ClubDiscussions from "../components/Discussions/ClubDiscussions";
import ClubBanner from "../components/Club/ClubBanner";
import ClubDetails from "../components/Club/ClubDetails";
import { fetchClub } from "@/services/clubService";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import MembersList from "@/components/Club/Club Members/MembersList";
import { SignInButton } from "@clerk/clerk-react";

export default function ClubPage() {
  const { id } = useParams();
  const { isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState("discussions");

  const {
    data: club,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: () => fetchClub(id, true),
  });

  const isMember =
    isSignedIn && club?.members?.some((member) => member.userId === user?.id);

  const renderContent = () => {
    if (!isSignedIn) {
      return (
        <div className="p-8 text-center bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-gray-300 mb-4">Sign in to view club content</p>
          <SignInButton mode="modal">
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>
      );
    }

    if (!isMember) {
      return (
        <div className="p-8 text-center bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-gray-300">
            Join this club to view discussions and members
          </p>
        </div>
      );
    }

    return (
      <div className="p-8">
        {activeTab === "discussions" ? (
          <ClubDiscussions clubId={club.id} user={user} />
        ) : (
          <MembersList members={club.members} />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading club...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-500 bg-red-100 rounded-lg shadow">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <ClubBanner imageUrl={club.imageUrl} />
      <div className="relative z-10 px-4 mx-auto -mt-52 max-w-7xl sm:px-6 lg:px-8">
        <ClubDetails club={club} isMember={isMember} />
        <div className="px-8 mt-8 border-b border-gray-800">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("discussions")}
              className={`px-4 py-4 font-medium ${
                activeTab === "discussions"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Discussions
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`px-4 py-4 font-medium ${
                activeTab === "members"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Members
            </button>
          </nav>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
