<template>
  <Loader v-if="isPending" />
  <div v-else class="container space-y-4">
    <Back />
    <About :data="data" />
    <div v-if="data.isCompany" class="card">
      <p class="font-semibold text-green-600 my-4">Job opened for hiring</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="job in data.jobs">
          <JobCard :job="job" :key="job.$id" />
        </div>
      </div>
    </div>
    <div v-else class="card">
      <Tab />
    </div>
  </div>

</template>

<script setup>
import About from "./About.vue";
import Loader from "../components/Loader.vue";
import JobCard from "../components/JobCard.vue";
import Back from "../components/Back.vue";
import { useGetCompany } from "../lib/appWrite/query/profileQuery";
import Tab from "../components/Tab.vue";

const props = defineProps({
  id: String
})

const { data, isPending } = useGetCompany(props.id);
</script>

<style lang="scss" scoped></style>