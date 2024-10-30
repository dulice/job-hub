<template>
  <SearchInput />
  <div class="grid grid-cols-2 gap-4 my-4">
    <div class="card space-y-2">
      <p class="font-semibold text-lg">For Developers</p>
      <p>Browser our jobs to become developer today</p>
      <button @click="router.push('/jobs')" class="btn btn-dark">
        Explore jobs
      </button>
    </div>
    <div class="card-primary space-y-2">
      <p class="font-semibold text-lg">For Employers</p>
      <p>List your job to find the perfect developer for your role.</p>
      <button @click="router.push('/jobs/add')" class="btn btn-primary">
        Add jobs
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SearchInput from "./SearchInput.vue";
const router = useRouter();
</script>