<template>
  <div class="container card">
    <div class="bg-green-100 flex justify-around font-semibold">
      <button
        :class="[
          'py-2 border-b-2 w-full transition-all',
          type === 'company' ? 'border-b-green-500' : '',
        ]"
        @click="type = 'company'"
      >
        Company
      </button>
      <button
        :class="[
          'py-2 border-b-2 w-full transition-all',
          type === 'employer' ? 'border-b-green-500' : '',
        ]"
        @click="type = 'employer'"
      >
        Employer
      </button>
    </div>
    <RegisterCompany v-if="type === 'company'" />
    <RegisterUser v-else />
  </div>
</template>

<script setup>
import { ref } from "vue";
import RegisterCompany from "./RegisterCompany.vue";
import RegisterUser from "./RegisterUser.vue";

const type = ref("employer");
</script>

<style scoped></style>
