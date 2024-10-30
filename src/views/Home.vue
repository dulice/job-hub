<template>
  <div class="container">
    <Hero />
    <JobsList :limit="3" />
    <div class="flex justify-center my-4">
      <RouterLink to="/jobs" class="btn btn-primary">View More Jobs</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import JobsList from "../components/JobsList.vue";
import Hero from "../components/Hero.vue";
</script>