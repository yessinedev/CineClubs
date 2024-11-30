import { useState, useEffect, useRef } from "react";
import { Search, Users2, X, Blocks } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchBarUnified() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);

      if (isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
        setSearchQuery("");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setIsMobileSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isMobileSearchOpen]);

  const dummyUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "@alicej",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      role: "Full Stack Developer",
      status: "online",
      type: "user",
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "@bobsmith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      role: "UI/UX Designer",
      status: "offline",
      type: "user",
    },
    {
      id: 3,
      name: "Charlie Brown",
      username: "@charlieb",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      role: "DevOps Engineer",
      status: "online",
      type: "user",
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
      type: "community",
    },
    {
      id: 2,
      name: "Spring Boot Masters",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=spring",
      members: 892,
      description: "Java & Spring Boot development group",
      category: "Backend",
      type: "community",
    },
    {
      id: 3,
      name: "DevOps United",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=devops",
      members: 567,
      description: "Cloud & DevOps professionals",
      category: "DevOps",
      type: "community",
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsOpen(true);
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setIsOpen(false);
    setSearchQuery("");
  };

  const getSearchResults = () => {
    const users = dummyUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const clubs = dummyClubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...users, ...clubs].sort((a, b) => {
      const aIndex = a.name.toLowerCase().indexOf(searchQuery.toLowerCase());
      const bIndex = b.name.toLowerCase().indexOf(searchQuery.toLowerCase());
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  };

  const handleKeyDown = (event) => {
    const results = getSearchResults();

    if (event.key === "Escape") {
      handleEscKey(event);
      return;
    }

    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : results.length - 1
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      const selectedResult = results[highlightedIndex];
      if (selectedResult) {
        const path =
          selectedResult.type === "user"
            ? `/profile/${selectedResult.id}`
            : `/clubs/${selectedResult.id}`;
        window.location.href = path;
        setIsOpen(false);
        setSearchQuery("");
      }
    }
  };

  if (isMobileSearchOpen) {
    return (
      <div ref={mobileSearchRef} className="fixed inset-0 z-50 bg-[#1c1c1c]">
        <div className="flex items-center gap-2 p-4 bg-[#1c1c1c] border-b border-gray-800">
          <button
            onClick={closeMobileSearch}
            className="p-2 hover:bg-gray-800/50 rounded-full"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full bg-gray-900/50 rounded-full px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto bg-[#1c1c1c]">
          {searchQuery && (
            <div className="space-y-1">
              {getSearchResults().map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={
                    result.type === "user"
                      ? `/profile/${result.id}`
                      : `/clubs/${result.id}`
                  }
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800/50 transition-colors"
                  onClick={closeMobileSearch}
                >
                  <div className="relative">
                    <img
                      src={result.avatar}
                      alt={result.name}
                      className={`w-10 h-10 ${
                        result.type === "user" ? "rounded-full" : "rounded-lg"
                      }`}
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2d2d2d] flex items-center justify-center">
                      {result.type === "user" ? (
                        <Users2 className="w-3 h-3 text-blue-400" />
                      ) : (
                        <Blocks className="w-3 h-3 text-purple-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {result.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {result.type === "user" ? (
                        <>
                          <p className="text-xs text-gray-400">{result.role}</p>
                          <span className="text-xs text-gray-500">
                            {result.username}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-purple-400">
                            {result.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.members.toLocaleString()} members
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              {getSearchResults().length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-400">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="md:hidden p-2 hover:bg-gray-800/50 rounded-full"
      >
        <Search className="h-5 w-5 text-gray-400" />
      </button>

      <div className="relative hidden md:flex items-center w-[300px]">
        <Search className="absolute left-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
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

        {isOpen && searchQuery && (
          <div className="absolute top-full left-0 w-[300px] mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl shadow-xl z-50">
            <div className="max-h-[400px] overflow-y-auto p-2">
              {getSearchResults().map((result, index) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={
                    result.type === "user"
                      ? `/profile/${result.id}`
                      : `/clubs/${result.id}`
                  }
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors ${
                    index === highlightedIndex ? "bg-gray-800/50" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative">
                    <img
                      src={result.avatar}
                      alt={result.name}
                      className={`w-8 h-8 ${
                        result.type === "user" ? "rounded-full" : "rounded-lg"
                      }`}
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2d2d2d] flex items-center justify-center">
                      {result.type === "user" ? (
                        <Users2 className="w-2.5 h-2.5 text-blue-400" />
                      ) : (
                        <Blocks className="w-2.5 h-2.5 text-purple-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {result.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {result.type === "user" ? (
                        <>
                          <p className="text-xs text-gray-400 truncate">
                            {result.role}
                          </p>
                          <span className="text-xs text-gray-500">
                            {result.username}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-purple-400">
                            {result.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.members.toLocaleString()} members
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              {getSearchResults().length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-gray-400">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
