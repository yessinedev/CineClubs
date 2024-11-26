import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Film, UsersRound, Award, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  const getUserIdentifier = () => {
    if (user?.firstName) {
      const fullName = `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user?.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`
      return fullName;
    }
    return user?.primaryEmailAddress?.emailAddress || "User";
  };
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Film className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              CineClub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border px-3 py-2 border-gray-800 rounded-xl hover:border-purple-500/50">
              <UsersRound size={18} />
              <Link to="/clubs">Clubs</Link>
            </div>
            <div className="flex items-center gap-2 border px-3 py-2 border-gray-800 rounded-xl hover:border-purple-500/50">
              <Award size={18} />
              <Link to="/leaderboard">LeaderBoard</Link>
            </div>
          </div>
          <div>
            {isSignedIn ? (
              <div className="flex items-center gap-4 px-3 py-2 border border-gray-800 rounded-xl hover:border-purple-500/50">
                <span>Welcome, {getUserIdentifier()}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <img
                      src={user.imageUrl}
                      alt={getUserIdentifier()}
                      className="w-8 h-8 rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center justify-center space-x-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-colors">
                        <User2 className="w-2 h-2" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button className="flex items-center justify-center space-x-2 bg-black/20 hover:bg-black/40 text-white rounded-lg backdrop-blur-sm transition-colors">
                        <LogOut className="w-2 h-2" />
                        <SignOutButton />
                      </button>
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
