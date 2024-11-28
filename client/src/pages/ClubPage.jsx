import ClubDiscussions from "../components/Discussions/ClubDiscussions";
import ClubBanner from "../components/Club/ClubBanner";
import ClubDetails from "../components/Club/ClubDetails";
import { fetchClub } from "@/services/clubService";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import MembersList from "@/components/Club/MembersList";

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
  console.log(isMember);

  return (
    <div className="min-h-screen bg-gray-950">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg font-semibold text-gray-600 animate-pulse">
            Loading clubs...
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-4 text-red-500 bg-red-100 rounded-lg shadow">
            Error: {error.message}
          </div>
        </div>
      ) : (
        <>
          <ClubBanner imageUrl={club.imageUrl} />
          <div className="relative z-10 px-4 mx-auto -mt-52 max-w-7xl sm:px-6 lg:px-8">
            <ClubDetails club={club} isMember={isMember} user={user} />
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
            {/* Content Section */}
            {isMember ? (
              <div className="p-8">
                {activeTab === "discussions" ? (
                  <ClubDiscussions clubId={club.id} user={user} />
                ) : (
                  <MembersList />
                )}
              </div>
            ) : (
              <p>Join the club to see the content</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
