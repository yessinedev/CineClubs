import { useState } from "react";
import { Send } from "lucide-react";

export default function ClubChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", content: "Hello everyone!", timestamp: "12:01 PM" },
    { id: 2, user: "Bob", content: "Hi Alice!", timestamp: "12:02 PM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          user: "You",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="group flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-blue-400">{msg.user}</span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-white mt-1">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
