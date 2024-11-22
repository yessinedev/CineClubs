import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Film, Search, Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  const getUserIdentifier = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.primaryEmailAddress?.emailAddress || "User";
  };
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Film className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              CineClub
            </span>
          </div>

          <div className="items-center flex-1 hidden max-w-xl mx-8 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs, movies, or shows..."
                className="w-full py-2 pl-10 pr-4 text-gray-300 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <SignOutButton />
                <span>Welcome, {getUserIdentifier()}</span>
                <img
                  src={user.imageUrl}
                  alt={getUserIdentifier()}
                  className="w-8 h-8 rounded-full"
                />
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
