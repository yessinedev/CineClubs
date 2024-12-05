import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/websocket",
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function () {
      console.log("Connected to WebSocket");

      // Add club subscriptions
      client.subscribe("/topic/clubs", function (message) {
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
      client.subscribe("/topic/clubs/delete", function (message) {
        const clubId = JSON.parse(message.body);
        queryClient.setQueryData(["clubs"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((club) => club.id !== clubId);
        });
      });

      // Subscribe to club messages
      const messageSubscriptions = new Map();

      // Method to subscribe to a specific club's messages
      window.subscribeToClubMessages = (clubId) => {
        if (messageSubscriptions.has(clubId)) return;

        const subscription = client.subscribe(
          `/topic/clubs/${clubId}/messages`,
          function (message) {
            const newMessage = JSON.parse(message.body);
            queryClient.setQueryData(["messages", clubId], (oldData) => {
              if (!oldData) return [newMessage];
              return [newMessage, ...oldData];
            });
          }
        );

        messageSubscriptions.set(clubId, subscription);
      };

      // Method to unsubscribe from a specific club's messages
      window.unsubscribeFromClubMessages = (clubId) => {
        const subscription = messageSubscriptions.get(clubId);
        if (subscription) {
          subscription.unsubscribe();
          messageSubscriptions.delete(clubId);
        }
      };
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [queryClient]);
}
