import React from "react";
import {
  MessageCircle,
  MoreVertical,
  UserMinus,
  Shield,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/dateUtils";

const memberRoles = [
  {
    value: "ADMIN",
    label: "Admin",
    icon: <Shield className="w-4 h-4 text-red-400" />,
  },
  {
    value: "MODERATOR",
    label: "Moderator",
    icon: <Shield className="w-4 h-4 text-blue-400" />,
  },
  {
    value: "MEMBER",
    label: "Member",
    icon: <User className="w-4 h-4 text-gray-400" />,
  },
];

export default function MemberCard({ member, onAcceptMember, onDeclineMember }) {
  const currentRole =
    memberRoles.find((role) => role.value === member.role) || memberRoles[2];
  const isOwner = member.role === "ADMIN";

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-gray-800/70 transition-all duration-300">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="relative">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-12 h-12 rounded-xl object-cover border-2 border-gray-700 transition-transform group-hover:scale-105"
          />
          <div className="absolute -bottom-1 -right-1 p-1 bg-gray-900 rounded-full">
            {currentRole.icon}
          </div>
        </div>
        <div className="flex-1 sm:flex-initial justify-center">
          <h3 className="text-white py-1 font-medium group-hover:text-blue-400 transition-colors">
            {member.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                member.role === "ADMIN" && "bg-red-500/10 text-red-400",
                member.role === "MODERATOR" && "bg-blue-500/10 text-blue-400",
                member.role === "MEMBER" && "bg-gray-500/10 text-gray-400"
              )}
            >
              {currentRole.label}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">
              Joined At {formatDate(member.createdAt)}
            </span>
            <span
              className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                member.status === "PENDING" && "bg-yellow-500/10 text-yellow-400",
                member.status === "APPROVED" && "bg-green-500/10 text-green-400",
                member.status === "DECLINED" && "bg-red-500/10 text-red-400"
              )}
            >
              {member.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-900/50 rounded-full">
          <MessageCircle className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">
            {member.postsCount > 1 ? `${member.postsCount} posts` : `${member.postsCount} post`}
          </span>
        </div>

        {member.status === "PENDING" ? (
          <div className="flex items-center gap-2">
            <button
              className="p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30"
              onClick={() => onAcceptMember(member.id)}
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30"
              onClick={() => onDeclineMember(member.id)}
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
              <DropdownMenuLabel className="text-gray-400">
                Member Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              {memberRoles
                .filter((role) => role.value !== member.role)
                .map((role) => (
                  <DropdownMenuItem
                    key={role.value}
                    className={cn(
                      "flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer",
                      member.role === role.value && "bg-gray-800"
                    )}
                  >
                    {role.icon}
                    <span>Make {role.label}</span>
                  </DropdownMenuItem>
                ))}
              {member.role !== "ADMIN" && (
                <>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <UserMinus className="w-4 h-4" />
                    <span>Remove Member</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
