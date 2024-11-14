<template>
  <div class="container">
    <Back />
    <Loader v-if="isPending" />
    <div v-else class="card">
      <div
        v-for="chat in chats"
        class="grid grid-cols-12 border-b border-b-gray-300 py-2"
        @click="handleReadMessage(chat)">
        <img
          :src="DefaultImg"
          alt=""
          class="w-12 h-12 rounded-full col-span-1" />
        <div class="col-span-9">
          <p class="font-semibold">
            {{
              chat.receivedId.$id === user.$id
                ? chat.senderId.name
                : chat.receivedId.name
            }}
          </p>
          <p class="line-clamp-1">
            {{
              chat.senderId.$id === user.$id
                ? "You: " + chat.message
                : chat.message
            }}
          </p>
        </div>
        <div class="col-span-2 flex flex-col justify-end items-center">
          <p
            class="badge"
            v-if="
              !isLoadingNoti && notifications.messageCount[chat.conversationId]
            ">
            {{ notifications.messageCount[chat.conversationId]?.length }}
          </p>
          <small class="text-gray-700 text-nowrap">{{
            moment(chat.$createdAt).calendar()
          }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import Loader from "../components/Loader.vue";
import {
  useGetChats,
  useGetNotifications,
  useReadMessages,
} from "../lib/appWrite/query/messageQuery";
import { useGetUser } from "../lib/appWrite/query/profileQuery";
import DefaultImg from "../assets/logo.png";
import moment from "moment";
import { useRouter } from "vue-router";
import Back from "../components/Back.vue";
import { client } from "../lib/appWrite/config";
import { channel } from "../lib/constant";

const router = useRouter();
const { data: user } = useGetUser();
const userId = ref(null);
const { data: chats, isPending, refetch: refetchChats } = useGetChats(userId);
const {
  data: notifications,
  isPending: isLoadingNoti,
  refetch: refetchNoti,
} = useGetNotifications(userId);
const { mutateAsync: readMessages, isSuccess } = useReadMessages();

watchEffect(async () => {
  if (user.value?.$id != userId.value) {
    userId.value = user.value.$id;
    await refetchChats();
    await refetchNoti();
  }
  client.subscribe(channel, async () => {
    await refetchChats();
  });
});

const handleReadMessage = async (chat) => {
  const receivedId =
    user.value.$id === chat.receivedId.$id
      ? chat.senderId.$id
      : chat.receivedId.$id;
  if (notifications.value.messageCount[chat.conversationId]?.length > 0) {
    await readMessages({
      conversationId: chat.conversationId,
      senderId: receivedId,
    });
  }
  if (isSuccess) {
    router.push({
      name: "chat",
      query: {
        receivedId,
        senderId: user.value.$id,
      },
    });
  }
};
</script>

<style lang="scss" scoped></style>
