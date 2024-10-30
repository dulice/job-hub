<template>
  <div class="container">
    <Back link="/" />
    <SearchInput />
    <Loader v-if="isPending" />
    <div v-else-if="data.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="job in data">
        <JobCard :job="job" :key="job.$id" />
      </div>
    </div>
    <p v-else class="p-4 bg-red-200">
      <span>Your job result could not match. Search Other way.</span>
      <router-link to="/" class="text-green-600 underline">Search</router-link>
    </p>
  </div>
</template>

<script setup>
import JobCard from "../components/JobCard.vue";
import Back from "../components/Back.vue";
import Loader from "../components/Loader.vue";
import SearchInput from "../components/SearchInput.vue";
import { onUpdated } from "vue";
import { useSearchJobs } from "../lib/appWrite/query/jobQuery";

const props = defineProps({
  query: {
    q: String,
    location: String
  }
})
const { data, isPending } = useSearchJobs(props.query.q, props.query.location);
onUpdated(() => {
  const { data, isPending } = useSearchJobs(props.query.q, props.query.location);
})
</script>
