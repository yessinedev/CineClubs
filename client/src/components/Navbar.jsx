import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { UsersRound, Award, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code2 } from "lucide-react";
import SearchBar from "./Search/SearchBar";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  const getUserIdentifier = () => {
    if (user?.firstName) {
      const fullName = `${
        user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
      } ${user?.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`;
      return fullName;
    }
    return user?.primaryEmailAddress?.emailAddress || "User";
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-3">
              <Code2 className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text">
                DevHub
              </span>
            </Link>
            <SearchBar />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 border px-3 py-2 border-gray-800 rounded-xl hover:border-blue-500/50">
              <UsersRound size={18} />
              <Link to="/clubs">Communities</Link>
            </div>
            <div className="flex items-center gap-2 border px-3 py-2 border-gray-800 rounded-xl hover:border-blue-500/50">
              <Award size={18} />
              <Link to="/leaderboard">LeaderBoard</Link>
            </div>
          </div>

          <div>
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-4 outline-none">
                    <span className="text-sm md:text-base cursor-pointer hover:text-blue-400 transition-colors">
                      {getUserIdentifier()}
                    </span>
                    <img
                      src={user.imageUrl}
                      alt={getUserIdentifier()}
                      className="w-8 h-8 rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={8} className="z-[101]">
                    <DropdownMenuItem asChild className="md:hidden">
                      <Link
                        to="/clubs"
                        className="flex w-full items-center gap-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        <UsersRound className="w-4 h-4" />
                        <span>Communities</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="md:hidden">
                      <Link
                        to="/leaderboard"
                        className="flex w-full items-center gap-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>LeaderBoard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />

                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex w-full items-center gap-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        <User2 className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <div className="flex w-full items-center gap-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-colors">
                        <LogOut className="w-4 h-4" />
                        <SignOutButton className="w-full text-left" />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
