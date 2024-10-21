<template>
  <Loader v-if="isPending" />
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="job in data.slice(0, limit || data.length)">
      <JobCard :job="job" :key="job.$id" />
    </div>
  </div>
</template>

<script setup>
import JobCard from "./JobCard.vue";
import Loader from "./Loader.vue";
import { useGetJobs } from "../lib/appWrite/queries";

const { data, isPending } = useGetJobs();
defineProps({ limit: { type: Number } });

</script>

<style lang="scss" scoped></style>
