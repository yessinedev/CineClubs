import ClubDiscussions from "../components/Discussions/ClubDiscussions";
import ClubBanner from "../components/Club/ClubBanner";
import ClubDetails from "../components/Club/ClubDetails";
import { fetchClub } from "@/services/clubService";
import { useParams} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import MembersList from "@/components/Club/Club Members/MembersList";
import { SignInButton } from "@clerk/clerk-react";
import ErrorPage from "../components/ErrorPage";
import ClubChatPage from "./ClubChatPage";

export default function ClubPage() {
  const { slug } = useParams();
  const { isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState("discussions");

  const {
    data: club,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", slug],
    queryFn: () => fetchClub(slug, true),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (error?.response?.status === 404) {
    return (
      <ErrorPage
        title="Club Not Found"
        message="Sorry, we couldn't find the club you're looking for. It might have been deleted or the URL might be incorrect."
        code="404"
      />
    );
  }

  if (error) {
    console.log(error)
    return (
      <ErrorPage
        title="Something went wrong"
        message="We're having trouble loading this club. Please try again later."
        code="500"
      />
    );
  }

   
  const member = club?.members.find((member) => member.userId === user?.id  );
 
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

    if (!member || member.status !== 'APPROVED') {
      return (
        <div className="p-8 text-center bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-gray-300">
            Join this club to view discussions and members
          </p>
        </div>
      );
    }

    return (
      <div className="py-8">
        {activeTab === "discussions" ? (
          <ClubDiscussions club={club} user={user} />
        ) : activeTab === "members" ? (
          <MembersList members={club.members} />
        ) : (
          <ClubChatPage slug={club.slug} />
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

  return (
    <div className="min-h-screen bg-gray-950">
      <ClubBanner imageUrl={club.imageUrl} />
      <div className="relative z-10 px-4 mx-auto -mt-52 max-w-7xl sm:px-6 lg:px-8">
        <ClubDetails club={club} member={member} />
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
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-4 font-medium ${
                activeTab === "chat"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Chat
            </button>
          </nav>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
