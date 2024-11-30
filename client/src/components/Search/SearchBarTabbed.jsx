import { useState } from "react";
import { Search, Users2, X, Blocks } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchBarTabbed() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const dummyUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "@alicej",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      role: "Full Stack Developer",
      status: "online",
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "@bobsmith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      role: "UI/UX Designer",
      status: "offline",
    },
    {
      id: 3,
      name: "Charlie Brown",
      username: "@charlieb",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      role: "DevOps Engineer",
      status: "online",
    },
  ];

  const dummyClubs = [
    {
      id: 1,
      name: "React Developers",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=react",
      members: 1234,
      description: "A community for React enthusiasts",
      category: "Frontend",
    },
    {
      id: 2,
      name: "Spring Boot Masters",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=spring",
      members: 892,
      description: "Java & Spring Boot development group",
      category: "Backend",
    },
    {
      id: 3,
      name: "DevOps United",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=devops",
      members: 567,
      description: "Cloud & DevOps professionals",
      category: "DevOps",
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = dummyClubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setIsOpen(false);
    setSearchQuery("");
  };

  if (isMobileSearchOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1c1c1c]">
        <div className="flex items-center gap-2 p-4 bg-[#1c1c1c] border-b border-gray-800">
          <button
            onClick={closeMobileSearch}
            className="p-2 hover:bg-[#2d2d2d] rounded-full"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search users..."
              autoFocus
              className="w-full bg-[#2d2d2d] rounded-full px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex border-b border-gray-800 bg-[#1c1c1c]">
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "users"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <div className="flex items-center justify-center gap-2">
              <Users2 className="w-4 h-4" />
              <span>Users</span>
              {filteredUsers.length > 0 && (
                <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                  {filteredUsers.length}
                </span>
              )}
            </div>
          </button>
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "communities"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("communities")}
          >
            <div className="flex items-center justify-center gap-2">
              <Blocks className="w-4 h-4" />
              <span>Communities</span>
              {filteredClubs.length > 0 && (
                <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                  {filteredClubs.length}
                </span>
              )}
            </div>
          </button>
        </div>

        <div className="overflow-y-auto bg-[#1c1c1c]">
          {activeTab === "users" && (
            <div className="space-y-1">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Link
                    key={user.id}
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#2d2d2d] transition-colors"
                    onClick={closeMobileSearch}
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#1c1c1c] ${
                          user.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-400">{user.role}</p>
                        <span className="text-xs text-gray-500">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-400">
                  No users found
                </div>
              )}
            </div>
          )}

          {activeTab === "communities" && (
            <div className="space-y-1">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club) => (
                  <Link
                    key={club.id}
                    to={`/clubs/${club.id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#2d2d2d] transition-colors"
                    onClick={closeMobileSearch}
                  >
                    <img
                      src={club.avatar}
                      alt={club.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {club.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-purple-400">
                          {club.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {club.members.toLocaleString()} members
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-400">
                  No communities found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm">
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="md:hidden p-2 hover:bg-[#2d2d2d] rounded-full"
      >
        <Search className="h-5 w-5 text-gray-400" />
      </button>

      <div
        className={`relative hidden md:flex items-center ${
          isOpen ? "w-[300px]" : "w-[250px]"
        } transition-all duration-300 ease-out`}
      >
        <Search className="absolute left-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search users..."
          className="w-full bg-[#2d2d2d] border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3"
          >
            <X className="h-4 w-4 text-gray-500 hover:text-gray-400" />
          </button>
        )}

        {isOpen && (
          <div className="absolute top-full left-0 w-[300px] mt-2 bg-[#1c1c1c] border border-gray-800 rounded-xl shadow-xl z-50">
            <div className="flex border-b border-gray-800">
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === "users"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users2 className="w-4 h-4" />
                  <span>Users</span>
                  {filteredUsers.length > 0 && (
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                      {filteredUsers.length}
                    </span>
                  )}
                </div>
              </button>
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === "communities"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("communities")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Blocks className="w-4 h-4" />
                  <span>Communities</span>
                  {filteredClubs.length > 0 && (
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                      {filteredClubs.length}
                    </span>
                  )}
                </div>
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {activeTab === "users" && (
                <div className="p-2 space-y-1">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <Link
                        key={user.id}
                        to={`/profile/${user.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-gray-900 ${
                              user.status === "online"
                                ? "bg-green-500"
                                : "bg-gray-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white truncate">
                              {user.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {user.username}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">
                            {user.role}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-3 py-8 text-center text-sm text-gray-400">
                      No users found
                    </div>
                  )}
                </div>
              )}

              {activeTab === "communities" && (
                <div className="p-2 space-y-1">
                  {filteredClubs.length > 0 ? (
                    filteredClubs.map((club) => (
                      <Link
                        key={club.id}
                        to={`/clubs/${club.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <img
                          src={club.avatar}
                          alt={club.name}
                          className="w-8 h-8 rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white truncate">
                              {club.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-purple-400">
                              {club.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {club.members.toLocaleString()} members
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-3 py-8 text-center text-sm text-gray-400">
                      No communities found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
