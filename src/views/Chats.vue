<template>
  <div class="container">
    <Back />
    <Loader v-if="isPending" />
    <div v-else class="card">
      <RouterLink
        v-for="chat in chats"
        class="grid grid-cols-12 border-b border-b-gray-300 py-2"
        :to="{
          name: 'chat',
          query: {
            receivedId:
              user.$id === chat.receivedId.$id
                ? chat.senderId.$id
                : chat.receivedId.$id,
            senderId: user.$id,
          },
        }">
        <img
          :src="DefaultImg"
          alt=""
          class="w-12 h-12 rounded-full col-span-1" />
        <div class="col-span-10">
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
        <small class="col-span-1 text-gray-700">{{
          moment(chat.$createdAt).calendar()
        }}</small>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Loader from "../components/Loader.vue";
import { useGetChats } from "../lib/appWrite/query/messageQuery";
import { useGetUser } from "../lib/appWrite/query/profileQuery";
import DefaultImg from "../assets/logo.png";
import moment from "moment";
import { RouterLink } from "vue-router";
import Back from "../components/Back.vue";

const { data: user } = useGetUser();
const userId = computed(() => user.value?.$id);
const { data: chats, isPending } = useGetChats(userId);
</script>

<style lang="scss" scoped></style>
