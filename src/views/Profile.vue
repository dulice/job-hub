<template>
  <Loader v-if="isPending" />
  <div v-else class="container space-y-4">
    <Back />
    <About :data="data" />
    <div v-if="data.isCompany" class="card">
      <p class="font-semibold text-green-600 my-4">Job opened for hiring</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="job in data.jobs">
          <JobCard :job="job" :key="job.$id" :isAuth="true" />
        </div>
      </div>
    </div>
    <div v-else-if="user.$id === data.$id" class="card">
      <Tab />
    </div>
  </div>

</template>

<script setup>
import About from "./About.vue";
import Loader from "../components/Loader.vue";
import JobCard from "../components/JobCard.vue";
import Back from "../components/Back.vue";
import { useGetCompany, useGetUser } from "../lib/appWrite/query/profileQuery";
import Tab from "../components/Tab.vue";
import { ref, watchEffect } from "vue";

const props = defineProps({
  id: String
})

const { data: user } = useGetUser();
const userId = ref(props.id);
const isMyProfile = ref(true);
const { data, isPending, refetch } = useGetCompany(userId, isMyProfile);
watchEffect(() => {
  if(userId.value !== props.id) {
    userId.value = props.id;
    refetch();
  }
})
</script>

<style lang="scss" scoped></style>