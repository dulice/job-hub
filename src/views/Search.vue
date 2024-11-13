<template>
  <div class="container">
    <Back link="/" />
    <SearchInput />
    <Loader v-if="isPending" />
    <div v-else-if="data?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
import { ref, watchEffect } from "vue";
import { useSearchJobs } from "../lib/appWrite/query/jobQuery";

const props = defineProps({
  query: {
    q: String,
    location: String
  }
})

const q = ref(props.query.q);
const location = ref(props.query.location);

const { data, isPending, refetch } = useSearchJobs(q, location);

watchEffect(() => {
  if(q.value !== props.query.q || location.value !== props.query.q) {
    q.value = props.query.q;
    location.value = props.query.location;
    refetch();
  }
})
</script>
