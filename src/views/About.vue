<template>
  <div class="card space-y-4">
    <div class="flex justify-between items-center">
      <p class="font-semibold text-green-600 text-lg">{{ data.name }}</p>
      <RouterLink v-if="data.$id === user?.$id" :to="`/profile/edit/${data.$id}`"
        class="bg-green-200 p-2 rounded-full active:bg-green-300 transition-all"
        ><Icon icon="mdi-edit" class="text-xl"
      /></RouterLink>
    </div>
    <p class="text-gray-700">{{ data.description }}</p>
    <div class="flex space-x-4">
      <BtnIcon :title="data.email" icon="mdi-email" class="bg-green-200" />
      <BtnIcon :title="data.phone" icon="mdi-phone" class="bg-green-200" />
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import BtnIcon from "../components/BtnIcon.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useGetUser } from "../lib/appWrite/query/profileQuery";

const { data: user } = useGetUser();
const props = defineProps({
  data: { type: Object },
});
</script>

<style lang="scss" scoped></style>
