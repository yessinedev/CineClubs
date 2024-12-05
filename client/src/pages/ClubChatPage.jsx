import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchClub } from "@/services/clubService";
import ClubChat from "@/components/Club/ClubChat";
import { Users, ArrowLeft } from "lucide-react";

export default function ClubChatPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: club,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", slug],
    queryFn: () => fetchClub(slug),
  });

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading club: {error.message}
      </div>
    );
  }

  if (isLoading || !club) {
    return <div className="p-4 text-gray-400">Loading club...</div>;
  }

  const dummyMembers = [
    { id: 1, name: "Alice", online: true },
    { id: 2, name: "Bob", online: false },
    { id: 3, name: "Charlie", online: true },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gray-950">
      <div className="h-full pt-16">
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
          <button
            onClick={() => navigate(`/clubs/${slug}`)}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Club
          </button>
          <h1 className="text-xl font-bold text-white">{club.name} Chat</h1>
          <div className="w-[100px]"></div>
        </div>

        <div className="grid grid-cols-4 h-[calc(100%-64px)] bg-gray-950">
          {/* Main Chat Area */}
          <div className="col-span-3 border-r border-gray-800">
            <ClubChat club={club} />
          </div>

          {/* Members Sidebar */}
          <div className="bg-gray-900 p-4 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-2">Members</h2>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Users className="w-4 h-4 mr-2" />
                <span>{dummyMembers.length} Members</span>
              </div>
            </div>

            {/* Online Members */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Online</h3>
              <ul className="space-y-2">
                {dummyMembers
                  .filter((member) => member.online)
                  .map((member) => (
                    <li key={member.id} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-white">{member.name}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Offline Members */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Offline
              </h3>
              <ul className="space-y-2">
                {dummyMembers
                  .filter((member) => !member.online)
                  .map((member) => (
                    <li key={member.id} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                      <span className="text-gray-400">{member.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
