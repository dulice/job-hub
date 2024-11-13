import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getChats, getMessage, sendMessage } from "../api/messageApi";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => sendMessage(data),
    onSuccess: async (data) => {
      await queryClient.setQueryData(["message", data.conversationId], data);
      await queryClient.invalidateQueries({
        queryKey: ["message", data.conversationId],
      });
    },
  });
};

export const useGetMessages = (conversationId) => {
  return useQuery({
    queryKey: ["message", conversationId],
    queryFn: () => getMessage(conversationId),
  });
};

export const useGetChats = (userId) => {
  return useQuery({
    queryKey: ["chats", userId.value],
    queryFn: () => getChats(userId.value),
  });
};
