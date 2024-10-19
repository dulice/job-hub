<template>
  <button @click="router.back()">
    <Icon icon="mdi-arrow-back" />
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const router = useRouter();
</script>

<style lang="scss" scoped></style>
