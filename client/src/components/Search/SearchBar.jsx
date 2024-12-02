import { useState, useRef, useEffect } from "react";
import { Search, Users2, X, Blocks } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useClubSearch } from "../../hooks/useClubSearch";
import { useUserSearch } from "../../hooks/useUserSearch";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  const { data: filteredClubs = [], isLoading: isLoadingClubs } =
    useClubSearch(searchQuery);
  const { data: filteredUsers = [], isLoading: isLoadingUsers } =
    useUserSearch(searchQuery);

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

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleEscKey(event);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsOpen(false);
        setIsMobileSearchOpen(false);
      }
      return;
    }

    if (!isOpen) return;

    const userCount = filteredUsers.length;
    const clubCount = filteredClubs.length;
    const totalCount = userCount + clubCount;

    const getHighlightedItem = (index) => {
      if (index < userCount) {
        return filteredUsers[index];
      } else {
        return filteredClubs[index - userCount];
      }
    };

    const updateInputWithHighlighted = (index) => {
      const item = getHighlightedItem(index);
      if (item) {
        setDisplayValue(item.name || `${item.firstName} ${item.lastName}`);
      }
    };

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => {
        const newIndex = prevIndex < totalCount - 1 ? prevIndex + 1 : 0;
        updateInputWithHighlighted(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : totalCount - 1;
        updateInputWithHighlighted(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      const selectedItem = getHighlightedItem(highlightedIndex);

      if (selectedItem) {
        const path =
          "userId" in selectedItem
            ? `/profile/${selectedItem.userId}`
            : `/clubs/${selectedItem.id}`;
        navigate(path);
        setIsOpen(false);
        setSearchQuery("");
        setDisplayValue("");
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setDisplayValue(query);
    setHighlightedIndex(-1);
    if (query.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setIsOpen(false);
    setSearchQuery("");
  };

  const renderSearchResults = () => (
    <div className="absolute top-full left-0 w-[300px] mt-2 bg-[#1c1c1c] border border-gray-800 rounded-xl shadow-xl z-50">
      <div className="max-h-[400px] overflow-y-auto scrollbar-custom p-2">
        {/* Users Section */}
        {filteredUsers.length > 0 && (
          <>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
              <Users2 className="w-4 h-4" />
              <span>People</span>
            </div>
            <div className="space-y-1">
              {filteredUsers.map((user, index) => (
                <Link
                  key={user.userId}
                  to={`/profile/${user.userId}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors ${
                    index === highlightedIndex ? "bg-[#2d2d2d]" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={user.imageUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      @{user.username}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Clubs Section */}
        {filteredClubs.length > 0 && (
          <>
            <div className="flex items-center gap-2 px-3 py-2 mt-2 text-sm text-gray-400">
              <Blocks className="w-4 h-4" />
              <span>Communities</span>
            </div>
            <div className="space-y-1">
              {filteredClubs.map((club, index) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors ${
                    index + filteredUsers.length === highlightedIndex
                      ? "bg-[#2d2d2d]"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="w-8 h-8 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {club.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {club.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {searchQuery &&
          !isLoadingClubs &&
          !isLoadingUsers &&
          filteredUsers.length === 0 &&
          filteredClubs.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-gray-400">
              No results found
            </div>
          )}

        {(isLoadingClubs || isLoadingUsers) && (
          <div className="px-3 py-4 text-center text-sm text-gray-400">
            Searching...
          </div>
        )}
      </div>
    </div>
  );

  if (isMobileSearchOpen) {
    return (
      <div ref={mobileSearchRef} className="fixed inset-0 z-50 bg-[#1c1c1c]">
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
              value={displayValue}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search users..."
              autoFocus
              className="w-full bg-[#2d2d2d] rounded-full px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-2 bg-[#1c1c1c]">
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
            <Users2 className="w-4 h-4" />
            <span>Users</span>
          </div>
          {filteredUsers.length > 0 ? (
            <div className="space-y-1">
              {filteredUsers.map((user, index) => (
                <Link
                  key={user.userId}
                  to={`/profile/${user.userId}`}
                  className={`flex items-center gap-3 px-4 py-2 hover:bg-[#2d2d2d] transition-colors ${
                    index === highlightedIndex ? "bg-[#2d2d2d]" : ""
                  }`}
                  onClick={closeMobileSearch}
                >
                  <div className="relative">
                    <img
                      src={user.imageUrl}
                      alt={user.username}
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
                      {user.firstName} {user.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-400">{user.role}</p>
                      <span className="text-xs text-gray-500">
                        {user.username}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-2 px-4 py-2 mt-4 text-sm text-gray-400">
            <Blocks className="w-4 h-4" />
            <span>Communities</span>
          </div>
          {filteredClubs.length > 0 ? (
            <div className="space-y-1">
              {filteredClubs.map((club, index) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className={`flex items-center gap-3 px-4 py-2 hover:bg-[#2d2d2d] transition-colors ${
                    index + filteredUsers.length === highlightedIndex
                      ? "bg-[#2d2d2d]"
                      : ""
                  }`}
                  onClick={closeMobileSearch}
                >
                  <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {club.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {/* <span className="text-xs text-purple-400">
                        {club.category}
                      </span> */}
                      <span className="text-xs text-gray-500">
                        {club.membersCount.toLocaleString()} members
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          {filteredUsers.length === 0 && filteredClubs.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-400">
              No results found
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
        className="md:hidden p-2 hover:bg-[#2d2d2d] rounded-full"
      >
        <Search className="h-5 w-5 text-gray-400" />
      </button>

      <div className="relative hidden md:flex items-center w-[300px]">
        <Search className="absolute left-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full bg-[#2d2d2d] border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
        />
        {displayValue && (
          <button
            onClick={() => {
              setSearchQuery("");
              setDisplayValue("");
              setIsOpen(false);
            }}
            className="absolute right-3"
          >
            <X className="h-4 w-4 text-gray-500 hover:text-gray-400" />
          </button>
        )}

        {isOpen && searchQuery && renderSearchResults()}
      </div>
    </div>
  );
}
