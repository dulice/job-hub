<template>
  <Loader v-if="isPending" />
  <div v-else class="container space-y-4">
    <Back />
    <About :data="data" />
    <div class="card">
        <p>Job opened for hiring</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="job in data.jobs">
            <JobCard :job="job" :key="job.$id" />
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import About from "./About.vue";
import { useGetCompany } from "../lib/appWrite/queries";
import Loader from "../components/Loader.vue";
import JobCard from "../components/JobCard.vue";
import Back from "../components/Back.vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const { data, isPending } = useGetCompany(params.id);
</script>

<style lang="scss" scoped></style>
