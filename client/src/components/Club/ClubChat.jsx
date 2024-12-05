import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useClubMessages } from "@/hooks/useClubMessages";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ClubChat({ club }) {
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);

  const {
    messages = [],
    isLoading,
    sendMessage,
  } = useClubMessages(club?.id, user?.id);

  // Scroll to bottom on new messages
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Scroll immediately for initial load
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Handle loading states
  if (!club || !club.id || !user) {
    return <div className="p-4 text-gray-400">Loading...</div>;
  }

  if (isLoading) {
    return <div className="p-4 text-gray-400">Loading messages...</div>;
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const getUserInitials = (username) => {
    return (
      username
        ?.split(/\s+/)
        ?.map((n) => n[0])
        ?.join("")
        ?.toUpperCase() || "??"
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 px-4"
        style={{ height: "calc(100% - 80px)" }}
      >
        <div className="py-4 space-y-6">
          {Array.isArray(messages) &&
            messages.map((msg) => {
              const isCurrentUser = msg.sender.userId === user.id;
              const initials = getUserInitials(msg.sender.username);

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8 mb-1">
                    <AvatarImage
                      src={isCurrentUser ? user.imageUrl : msg.sender.imageUrl}
                      alt={msg.sender.username}
                    />
                    <AvatarFallback className="bg-gray-700 text-gray-200 text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex flex-col ${
                      isCurrentUser ? "items-end" : "items-start"
                    } max-w-[60%]`}
                  >
                    {!isCurrentUser && (
                      <span className="text-sm text-gray-400 ml-1 mb-1">
                        {msg.sender.username}
                      </span>
                    )}

                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-800 text-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 mx-1">
                      {format(new Date(msg.createdAt), "h:mm a")}
                    </span>
                  </div>
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.imageUrl} alt={user.username} />
            <AvatarFallback className="bg-gray-700 text-gray-200 text-xs">
              {getUserInitials(user.username)}
            </AvatarFallback>
          </Avatar>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white border-gray-700 focus:border-blue-500"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
