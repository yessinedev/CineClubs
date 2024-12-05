import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import apiClient from "@/services/apiClient";
import { useWebSocket } from "@/contexts/WebSocketContext";

const fetchMessages = async (clubId) => {
  if (!clubId) return [];
  const response = await apiClient.get(`/messages/club/${clubId}`);
  return response.data || [];
};

const sendMessage = async ({ clubId, content, userId }) => {
  if (!clubId || !userId) throw new Error("Missing required parameters");
  const response = await apiClient.post(
    `/messages/club/${clubId}`,
    { content },
    { params: { userId } }
  );
  return response.data;
};

export function useClubMessages(clubId, userId) {
  const queryClient = useQueryClient();
  const { subscribeToClubMessages, unsubscribeFromClubMessages, isConnected } =
    useWebSocket();

  useEffect(() => {
    if (clubId && isConnected) {
      subscribeToClubMessages(clubId);
      return () => unsubscribeFromClubMessages(clubId);
    }
  }, [
    clubId,
    isConnected,
    subscribeToClubMessages,
    unsubscribeFromClubMessages,
  ]);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", clubId],
    queryFn: () => fetchMessages(clubId),
    staleTime: Infinity,
    enabled: !!clubId,
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData(["messages", clubId], (oldData = []) => {
        if (oldData.some((msg) => msg.id === newMessage.id)) {
          return oldData;
        }
        return [...oldData, newMessage];
      });
    },
  });

  // Ensure messages are always sorted by creation time
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return {
    messages: sortedMessages,
    isLoading,
    isConnected,
    sendMessage: (content) => sendMessageMutation({ clubId, content, userId }),
  };
}
