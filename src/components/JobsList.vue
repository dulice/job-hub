<template>
  <Loader v-if="isPending" />
  <p v-else-if="isError">{{ error }}</p>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="job in data.pages.flatMap(page => page.jobs)">
      <JobCard :job="job" :key="job.$id" />
    </div>
  </div>
</template>

<script setup>
import { useGetJobs } from "../lib/appWrite/query/jobQuery";
import JobCard from "./JobCard.vue";
import Loader from "./Loader.vue";

const props = defineProps({
  limit: { type: Number, default: 3 },
});

const { data, isPending, isError, error } = useGetJobs({limit: props.limit});

</script>

<style lang="scss" scoped></style>
