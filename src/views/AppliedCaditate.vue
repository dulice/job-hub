<template>
  <div class="container">
    <Back />
    <LoaderSkeleton v-if="isPending" />
    <div v-else class="card-primary container">
      <div
        v-if="data.applied.length > 0"
        v-for="apply in data.applied"
        class="grid grid-cols-12 gap-4 mb-4 border-b border-b-gray-300 pb-4">
        <img :src="apply.user.image ?? DefaultImg" alt="" class="col-span-1" />
        <div class="col-span-9">
          <RouterLink
            :to="`/profile/${apply.user.$id}`"
            class="font-semibold hover:underline"
            >{{ apply.user.name }}</RouterLink
          >
          <div class="text-sm text-orange-600 flex items-center space-x-1">
            <Icon icon="mdi-location" />
            <p>{{ apply.location }}</p>
          </div>
          <div class="flex items-center space-x-1">
            <Icon icon="mdi-email" />
            <p>{{ apply.email }}</p>
          </div>
          <div class="flex items-center space-x-1">
            <Icon icon="mdi-phone" />
            <p>{{ apply.phoneNumber }}</p>
          </div>
          <small>Applied {{ moment(apply.$createdAt).fromNow() }}</small>
        </div>
        <div class="col-span-1">
          <button @click="openModal(apply)">
            <Icon icon="mdi-paper-outline" class="text-2xl text-yellow-600" />
          </button>
        </div>
        <RouterLink
          :to="{
            name: 'chat',
            query: {
              receivedId: apply.user.$id,
              senderId: currentUser?.$id,
            },
          }"
          class="col-span-1">
          <Icon icon="mdi-chat-outline" class="text-2xl text-green-700" />
        </RouterLink>
        <ResumeModal
          :isOpenModal="isOpenModal"
          @closeModal="closeModal"
          :user="user" />
      </div>
      <div v-else class="bg-orange-100 text-orange-700 p-2">
        No canditate haven't applied yet.
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import LoaderSkeleton from "../components/LoaderSkeleton.vue";
import { useGetJob } from "../lib/appWrite/query/jobQuery";
import moment from "moment";
import { Icon } from "@iconify/vue/dist/iconify.js";
import Back from "../components/Back.vue";
import DefaultImg from "../assets/logo.png";
import { useGetUser } from "../lib/appWrite/query/profileQuery";
import ResumeModal from "../components/ResumeModal.vue";
import { ref } from "vue";

const { params } = useRoute();
const { data, isPending } = useGetJob(params.id);
const { data: currentUser } = useGetUser();
const user = ref(null);
const isOpenModal = ref(false);
const openModal = (data) => {
  isOpenModal.value = true;
  user.value = data;
};
const closeModal = () => {
  isOpenModal.value = false;
};
</script>
