<template>
  <LoaderSkeleton v-if="isPending" />
  <div v-else>
    <div v-if="data.length > 0"v-for="applied in data" class="grid grid-cols-10 gap-4 mb-4">
      <img :src="applied.job.company.image ?? DefaultImg" alt="" class="col-span-1" />
      <div class="col-span-9">
        <RouterLink :to="`/jobs/${applied.job.$id}`" class="font-semibold hover:underline">{{ applied.job.title }}</RouterLink>
        <p>{{ applied.job.company.name }}</p>
        <div class="text-sm flex space-x-2">
          <div class="flex text-orange-500">
            <Icon icon="mdi-location"/>
            <p>
              {{ applied.job.location }}
            </p>
          </div>
          <p>({{ applied.job.type }})</p>
        </div>
        <small>Applied {{ moment(applied.$createdAt).fromNow() }}</small>
      </div>
    </div>
    <div v-else class="bg-orange-100 text-orange-700 p-2">
      You haven't applied any job yet.
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useGetJobByUser } from "../lib/appWrite/query/applyQuery";
import moment from "moment";
import { Icon } from "@iconify/vue/dist/iconify.js";
import DefaultImg from "../assets/logo.png";
import LoaderSkeleton from "./LoaderSkeleton.vue";

const { params } = useRoute();
const { data, isPending } = useGetJobByUser(params.id);
</script>
