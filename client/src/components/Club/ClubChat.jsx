import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useClubMessages } from "@/hooks/useClubMessages";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">
      {/* Messages Area */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 px-4"
        style={{ height: "calc(100% - 80px)" }}
      >
        <div className="py-4 space-y-4">
          {Array.isArray(messages) &&
            messages.map((msg) => {
              const isCurrentUser = msg.sender.id === user.id;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    isCurrentUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={msg.sender.imageUrl}
                    alt={msg.sender.username}
                    className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"
                  />
                  <div
                    className={`flex flex-col ${
                      isCurrentUser ? "items-end" : "items-start"
                    } max-w-[70%]`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {msg.sender.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(msg.createdAt), "h:mm a")}
                      </span>
                    </div>
                    <div
                      className={`mt-1 px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-800 text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                    </div>
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
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
