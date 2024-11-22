import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const { isSignedIn, user } = useUser();

  const getUserIdentifier = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.primaryEmailAddress?.emailAddress || "User";
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Clubs Management</h1>
        <div>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <img
                src={user.imageUrl}
                alt={getUserIdentifier()}
                className="w-8 h-8 rounded-full"
              />
              <span>Welcome, {getUserIdentifier()}</span>
              <SignOutButton />
            </div>
          ) : (
            <SignInButton mode="modal" />
          )}
        </div>
      </div>
    </header>
  );
}
