<template>
  <div class="container">
    <Loader v-if="isPending" />
    <div v-else class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div ref="offset" v-for="job in data.pages.flatMap(page => page.jobs)">
          <JobCard :job="job" :key="job.$id" />
        </div>
      </div>
      <div v-if="hasNextPage" class="flex justify-center">
        <button class="btn-outline" @click="loadMore" :disabled="isPending || isFetchingNextPage">
          <p>{{isFetchingNextPage ? "Loading More..." : "Load More" }}</p>
          <Icon icon="mdi-arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import Loader from "../components/Loader.vue";
import JobCard from "../components/JobCard.vue";
import { useGetJobs } from "../lib/appWrite/query/jobQuery";

const limit = 12;
const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetJobs({limit});

const loadMore = async () => {
  if(hasNextPage.value) {
    await fetchNextPage();
  }
};
</script>
