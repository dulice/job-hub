<template>
  <div class="flex items-center space-x-2 px-4 py-2 rounded-md shadow-sm">
    <Icon :icon="icon" /> <span>{{ title }}</span>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
defineProps({
  icon: { type: String },
  title: { type: String },
});
</script>

<style lang="scss" scoped></style>
