<template>
  <div class="max-w-5xl mx-auto">
    <div class="card-primary h-[calc(100vh-4rem)]">
      <Back />
      <div
        v-if="isLoadingUser"
        class="flex items-center space-x-2 border-b border-gray-400 pb-2 animate-pulse">
        <div class="rounded-full w-14 h-14 bg-gray-300"></div>
        <div class="bg-gray-300 h-4 rounded w-1/4"></div>
      </div>
      <div
        v-else
        class="flex items-center space-x-2 border-b border-gray-400 pb-2">
        <img
          :src="user.image ?? DefautlImg"
          alt=""
          class="w-14 h-14 object-cover rounded-full" />
        <p>{{ user.name }}</p>
      </div>
      <div
        class="mt-2 h-[calc(100vh-14rem)] overflow-y-scroll"
        ref="chatContainer">
        <Loader v-if="isFetchingMessages" />
        <div
          v-else
          v-for="(data, date) in messagesByDate"
          class="mb-4 space-y-4">
          <div class="flex justify-center">
            <p class="rounded-full px-2 py-1 bg-gray-300">
              {{ date.toLocaleString() }}
            </p>
          </div>
          <div
            v-for="msg in data"
            :class="[
              `${
                msg.senderId.$id === query.senderId
                  ? 'justify-end me-4 ml-[10%]'
                  : 'justify-start mr-[10%]'
              }`,
              'flex',
            ]">
            <p class="rounded-md px-2 py-1 bg-gray-300 text-left">
              <span>
                {{ msg.message }}
              </span>
              <small class="float-right m-1 text-gray-700">{{
                moment(msg.$createdAt).format("LT")
              }}</small>
            </p>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex w-full bottom-4">
        <textarea
          type="text"
          class="px-4 py-2 outline-none border border-green-400 w-full"
          placeholder="Type message..."
          v-model="message"
          rows="1"></textarea>
        <button
          type="submit"
          class="px-4 py-2 btn-primary"
          :disabled="message.trim().length < 1">
          <Icon icon="mdi-send" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useGetCompany } from "../lib/appWrite/query/profileQuery";
import DefautlImg from "../assets/logo.png";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { nextTick, ref, watchEffect } from "vue";
import moment from "moment";
import {
  useGetMessages,
  useSendMessage,
} from "../lib/appWrite/query/messageQuery";
import { channel, groupByDate, ids } from "../lib/constant";
import { client } from "../lib/appWrite/config";
import Loader from "../components/Loader.vue";
import Back from "../components/Back.vue";

const props = defineProps({
  query: {
    receivedId: String,
    senderId: String,
  },
});

const chatContainer = ref(null);
const message = ref("");
const messages = ref([]);
const messagesByDate = ref([]);
const isFetchingMessages = ref("");

const { mutateAsync } = useSendMessage();
const { data: user, isPending: isLoadingUser } = useGetCompany(
  props.query.receivedId
);
const {
  data: fetchMessages,
  isPending,
  refetch,
} = useGetMessages(ids(props.query.receivedId, props.query.senderId));

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};
watchEffect(async () => {
  if (props.query.receivedId || props.query.senderId) {
    await refetch();
  }
  isFetchingMessages.value = isPending.value;
  messages.value = fetchMessages.value;
  messagesByDate.value = groupByDate(messages.value);
  client.subscribe(channel, ({ payload }) => {
    messages.value = [...messages.value, payload];
    messagesByDate.value = groupByDate(messages.value);
  });
  scrollToBottom();
});

const sendMessage = async () => {
  if (message.value.trim().length > 0) {
    await mutateAsync({
      conversationId: ids(props.query.senderId, props.query.receivedId),
      senderId: props.query.senderId,
      receivedId: props.query.receivedId,
      message: message.value,
    });
    message.value = "";
    scrollToBottom();
  }
};
</script>
