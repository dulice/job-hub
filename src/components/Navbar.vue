<template>
  <div class="bg-green-100 fixed w-full top-0">
    <div class="max-w-5xl flex justify-between items-center mx-auto p-2">
      <RouterLink to="/">
        <img :src="Logo" alt="" class="w-10 rounded-full object-contain" />
      </RouterLink>
      <button @click.stop="toggleNavbar" class="btn-outline sm:hidden">
        <Icon v-if="isShow" icon="mdi-close" class="transition-all" />
        <Icon v-else icon="mdi-menu" class="transition-all" />
      </button>

      <!-- for laptop  -->
      <nav class="hidden sm:flex space-x-2">
        <RouterLink
          to="/"
          :class="['link', route.path === '/' ? 'bg-green-300' : '']"
          ><Icon icon="mdi-home-outline" />home</RouterLink
        >
        <RouterLink
          v-if="data"
          to="/chats"
          :class="[
            'link relative',
            route.path === '/chats' ? 'bg-green-300' : '',
          ]"
          ><Icon icon="mdi-chat-outline" /><span>Chat</span>
          <small v-if="notifications?.totalCount > 0" class="badge">{{
            notifications?.totalCount
          }}</small>
        </RouterLink>
        <RouterLink
          to="/jobs"
          :class="['link', route.path === '/jobs' ? 'bg-green-300' : '']"
          ><Icon icon="mdi-work-outline" />jobs</RouterLink
        >
        <RouterLink
          v-if="data?.isCompany"
          to="/jobs/add"
          :class="['link', route.path === '/jobs/add' ? 'bg-green-300' : '']"
          ><Icon icon="mdi-briefcase-plus-outline" />Add job</RouterLink
        >

        <div v-if="data" class="relative inline-block text-left">
          <button @click.stop="toggleActive" class="btn-outline">
            <span>{{ data.name }}</span>
            <Icon icon="mdi-chevron-down" />
          </button>

          <div
            v-show="isActive"
            id="dropdownMenu"
            class="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div class="py-1">
              <RouterLink
                :to="{ name: 'profile', params: { id: data.$id } }"
                class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-200">
                <Icon icon="mdi-user" /> <span>Profile</span>
              </RouterLink>
              <p
                @click.stop="handleLogout"
                class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-200">
                <Icon icon="mdi-logout" />
                <span>{{ isPending ? "Logging Out..." : "Logout" }}</span>
              </p>
            </div>
          </div>
        </div>
        <RouterLink
          v-else
          to="/register"
          :class="['link', route.path === '/register' ? 'bg-green-300' : '']"
          >register</RouterLink
        >
      </nav>
    </div>
    <!-- for mobile  -->
    <nav
      v-if="isShow"
      class="h-screen z-10 flex sm:hidden flex-col justify-center items-center">
      <RouterLink
        to="/"
        :class="[
          'link w-full text-center',
          route.path === '/' ? 'bg-green-300' : '',
        ]"
        >home</RouterLink
      >
      <RouterLink
        v-if="data"
        to="/chats"
        :class="[
          'link relative',
          route.path === '/chats' ? 'bg-green-300' : '',
        ]"
        ><Icon icon="mdi-chat-outline" /><span>Chat</span>
        <small v-if="notifications.totalCount > 0" class="badge">{{
          notifications.totalCount
        }}</small>
      </RouterLink>
      <RouterLink
        to="/jobs"
        :class="[
          'link w-full text-center',
          route.path === '/jobs' ? 'bg-green-300' : '',
        ]"
        >jobs</RouterLink
      >
      <RouterLink
        v-if="data?.isCompany"
        to="/jobs/add"
        :class="[
          'link w-full text-center',
          route.path === '/jobs/add' ? 'bg-green-300' : '',
        ]"
        >Add job</RouterLink
      >

      <div v-if="data" class="relative inline-block text-left">
        <button @click.stop="toggleActive" class="btn-outline">
          <span>{{ data.name }}</span>
          <Icon icon="mdi-chevron-down" />
        </button>

        <div
          v-show="isActive"
          id="dropdownMenu"
          class="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1">
            <RouterLink
              :to="`/profile/${data.$id}`"
              class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-200">
              <Icon icon="mdi-user" /> <span>Profile</span>
            </RouterLink>
            <p
              @click.stop="handleLogout"
              class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-200">
              <Icon icon="mdi-logout" />
              <span>{{ isPending ? "Logging Out..." : "Logout" }}</span>
            </p>
          </div>
        </div>
      </div>
      <RouterLink
        v-else
        to="/register"
        :class="[
          'link w-full text-center',
          route.path === '/register' ? 'bg-green-300' : '',
        ]"
        >register</RouterLink
      >
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import Logo from "../assets/logo.png";
import { onMounted, ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useGetUser, useLogout } from "../lib/appWrite/query/profileQuery";
import { useGetNotifications } from "../lib/appWrite/query/messageQuery";
import { client } from "../lib/appWrite/config";
import { channel } from "../lib/constant";

const { mutate, isSuccess, isPending } = useLogout();
const { data } = useGetUser();
const userId = ref(null);

const { data: notifications, refetch } = useGetNotifications(userId);

watchEffect(async () => {
  if (data.value?.$id != userId.value) {
    userId.value = data.value.$id;
    await refetch();
  }
  client.subscribe(channel, async () => {
    await refetch();
  });
});

const route = useRoute();
const router = useRouter();
const isActive = ref(false);
const isShow = ref(false);

const toggleNavbar = () => {
  isShow.value = !isShow.value;
};

const toggleActive = () => {
  isActive.value = !isActive.value;
};

onMounted(() => {
  document.addEventListener("click", () => {
    isActive.value = false;
    isShow.value = false;
  });
});

const handleLogout = () => {
  mutate();
  if (isSuccess) {
    router.push("/login");
  }
};
</script>

<style lang="scss" scoped></style>
