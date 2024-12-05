import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();
  const messageSubscriptions = new Map();

  useEffect(() => {
    const wsClient = new Client({
      brokerURL: "ws://localhost:8080/ws/websocket",
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    wsClient.onConnect = function () {
      console.log("Connected to WebSocket");
      setIsConnected(true);
      setClient(wsClient);

      // Add club subscriptions
      wsClient.subscribe("/topic/clubs", function (message) {
        const club = JSON.parse(message.body);
        queryClient.setQueryData(["clubs"], (oldData) => {
          if (!oldData) return [club];
          const index = oldData.findIndex((c) => c.id === club.id);
          if (index === -1) {
            return [...oldData, club];
          }
          const newData = [...oldData];
          newData[index] = club;
          return newData;
        });
      });

      // Subscribe to club deletions
      wsClient.subscribe("/topic/clubs/delete", function (message) {
        const clubId = JSON.parse(message.body);
        queryClient.setQueryData(["clubs"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((club) => club.id !== clubId);
        });
      });
    };

    wsClient.onDisconnect = () => {
      setIsConnected(false);
      messageSubscriptions.clear();
    };

    wsClient.activate();

    return () => {
      wsClient.deactivate();
      setIsConnected(false);
      messageSubscriptions.clear();
    };
  }, [queryClient]);

  const subscribeToClubMessages = useCallback(
    (clubId) => {
      if (!isConnected || !client || messageSubscriptions.has(clubId)) return;

      try {
        const subscription = client.subscribe(
          `/topic/clubs/${clubId}/messages`,
          function (message) {
            const newMessage = JSON.parse(message.body);
            queryClient.setQueryData(["messages", clubId], (oldData = []) => {
              if (oldData.some((msg) => msg.id === newMessage.id)) {
                return oldData;
              }
              return [...oldData, newMessage];
            });
          }
        );

        messageSubscriptions.set(clubId, subscription);
      } catch (error) {
        console.error("Error subscribing to club messages:", error);
      }
    },
    [client, isConnected, queryClient]
  );

  const unsubscribeFromClubMessages = useCallback((clubId) => {
    const subscription = messageSubscriptions.get(clubId);
    if (subscription) {
      try {
        subscription.unsubscribe();
      } catch (error) {
        console.error("Error unsubscribing from club messages:", error);
      }
      messageSubscriptions.delete(clubId);
    }
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        subscribeToClubMessages,
        unsubscribeFromClubMessages,
        isConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
