<template>
  <button @click="link ? router.push(link) : router.back()">
    <Icon icon="mdi-arrow-back" />
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

defineProps({
  link: {type: String},
})
const router = useRouter();
</script>

<style lang="scss" scoped></style>
