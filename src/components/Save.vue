<template>
    <LoaderSkeleton v-if="isPending" />
    <div v-else>
      <div v-if="data.saved.length > 0"v-for="saved in data.saved" class="grid grid-cols-10 gap-4 mb-4">
        <img :src="saved.company.image ?? DefaultImg" alt="" class="col-span-1" />
        <div class="col-span-8">
          <RouterLink :to="`/jobs/${saved.$id}`" class="font-semibold hover:underline">{{ saved.title }}</RouterLink>
          <p>{{ saved.company.name }}</p>
          <div class="text-sm flex space-x-2">
            <div class="flex text-orange-500">
              <Icon icon="mdi-location"/>
              <p>
                {{ saved.location }}
              </p>
            </div>
            <p>({{ saved.type }})</p>
          </div>
        </div>
        <button class="col-span-1" @click="mutate({id: params.id, jobId: saved.$id})">
            <Icon icon="mdi-bookmark" />
        </button>
      </div>
      <div v-else class="bg-orange-100 text-orange-700 p-2">
        You haven't saved any job yet.
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink, useRoute } from "vue-router";
  import { Icon } from "@iconify/vue/dist/iconify.js";
  import DefaultImg from "../assets/logo.png";
  import LoaderSkeleton from "./LoaderSkeleton.vue";
import { useGetCompany, useSaveUnsaveJob } from "../lib/appWrite/query/profileQuery";
  
  const { params } = useRoute();
  const { data, isPending } = useGetCompany(params.id);
  const { mutate } = useSaveUnsaveJob();
  </script>
  