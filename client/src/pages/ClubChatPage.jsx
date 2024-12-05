import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchClub } from "@/services/clubService";
import ClubChat from "@/components/Club/ClubChat";
import { Users, ArrowLeft, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function ClubChatPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: club,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", slug],
    queryFn: () => fetchClub(slug, true),
    staleTime: 1000 * 60 * 5,
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

  // For now, let's randomly assign online status to members
  const membersWithStatus = club.members.map((member) => ({
    ...member,
    online: Math.random() < 0.3,
  }));

  const onlineMembers = membersWithStatus.filter((member) => member.online);
  const offlineMembers = membersWithStatus.filter((member) => !member.online);

  const MembersList = () => (
    <div className="space-y-6">
      {/* Online Members */}
      {onlineMembers.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Online ({onlineMembers.length})
          </h3>
          <ul className="space-y-2">
            {onlineMembers.map((member) => (
              <li key={member.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={member.imageUrl} alt={member.username} />
                  <AvatarFallback className="bg-gray-700 text-gray-200 text-xs">
                    {member.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white">{member.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Offline Members */}
      {offlineMembers.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Offline ({offlineMembers.length})
          </h3>
          <ul className="space-y-2">
            {offlineMembers.map((member) => (
              <li key={member.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={member.imageUrl} alt={member.username} />
                  <AvatarFallback className="bg-gray-700 text-gray-200 text-xs">
                    {member.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-400">{member.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen overflow-hidden bg-gray-950">
      <div className="h-full pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
            <div className="w-[100px]">
              <button
                onClick={() => navigate(`/clubs/${slug}`)}
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            </div>
            <h1 className="text-xl font-bold text-white flex-1 text-center">
              {club.name} Chat
            </h1>
            <div className="w-[100px] flex justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Users className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] bg-gray-900 p-4 border-l border-gray-800"
                  hideCloseButton
                >
                  <SheetHeader className="mb-6 relative">
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 rounded-full hover:bg-gray-800"
                      >
                        <X className="h-5 w-5 text-gray-400" />
                      </Button>
                    </SheetClose>
                    <SheetTitle className="text-white">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>{club.members.length} Members</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <MembersList />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 h-[calc(100%-64px)] bg-gray-950">
            {/* Main Chat Area */}
            <div className="col-span-1 md:col-span-5 border-r border-gray-800">
              <ClubChat club={club} />
            </div>

            {/* Members Sidebar */}
            <div className="hidden md:block bg-gray-900 p-4 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Members
                </h2>
                <div className="flex items-center text-sm text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{club.members.length} Members</span>
                </div>
              </div>
              <MembersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
