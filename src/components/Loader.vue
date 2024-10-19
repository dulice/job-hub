<template>
  <Icon icon="mdi-loading" class="spin w-14 h-14 mx-auto my-10 text-green-500" />
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
