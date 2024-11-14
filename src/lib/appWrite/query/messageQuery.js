import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
  getChats,
  getMessage,
  getNotifications,
  readMessages,
  sendMessage,
} from "../api/messageApi";

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
    queryKey: ["chats", userId],
    queryFn: () => getChats(userId.value),
    enabled: !!userId.value,
  });
};

export const useGetNotifications = (userId) => {
  return useQuery({
    queryKey: ["message", userId],
    queryFn: () => getNotifications(userId.value),
    enabled: !!userId.value,
  });
};

export const useReadMessages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["message"],
    mutationFn: ({ conversationId, senderId }) =>
      readMessages(conversationId, senderId),
    onSuccess: async (data) => {
      await queryClient.setQueryData(["message"], data);
      await queryClient.invalidateQueries({ queryKey: ["message"] });
    },
  });
};
