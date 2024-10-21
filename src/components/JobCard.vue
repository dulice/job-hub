<template>
  <div class="card-primary">
    <div class="space-y-2">
      <small>{{ props.job.type }}</small>
      <p class="font-semibold text-lg">{{ props.job.title }}</p>
    </div>

    <div class="divider"></div>
    <p :class="{'line-clamp-3': !showMore}">
      {{ props.job.description }}
    </p>
    <button @click="handleShow" class="text-gray-500 cursor-pointer">
      {{ showMore ? "See Less" : "See More" }}
    </button>
    <p class="font-semibold">{{ props.job.salary }} / Year</p>

    <div class="divider"></div>
    <div class="flex justify-between items-center">
      <div class="flex items-center text-orange-600 space-x-1">
        <Icon icon="mdi-location" />
        <p>{{ props.job.location }}</p>
      </div>
      <RouterLink :to="`/jobs/${props.job.$id}`" class="btn btn-primary text-nowrap"
        >Read More</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

const props = defineProps({
  job: Object,
});
const showMore = ref(false);

const handleShow = () => {
  showMore.value = !showMore.value;
};
</script>

<style lang="scss" scoped></style>
