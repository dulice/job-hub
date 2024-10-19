<template>
  <Loader v-if="state.isLoading" />
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="job in state.jobs.slice(0, limit || state.jobs.length)">
      <JobCard :job="job" :key="job.id" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import JobCard from "./JobCard.vue";
import Loader from "./Loader.vue";
import { getJobs } from "../lib/appWrite/api";

const state = reactive({
  isLoading: true,
  jobs: [],
});
defineProps({ limit: { type: Number } });

onMounted(async () => {
  try {
    const data = await getJobs();
    console.log(data)
    state.jobs = data;
  } catch (error) {
    console.log("Error:", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<style lang="scss" scoped></style>
