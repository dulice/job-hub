<template>
  <div class="container">
    <Back />
    <Loader v-if="state.isLoading"/>
    <div v-else class="grid grid-cols-12 gap-4 ">
      <div class="col-span-8 space-y-4">
        <div class="card space-y-2">
          <small>{{ state.job.type }}</small>
          <p class="text-lg font-semibold">
            {{ state.job.title }}
          </p>
          <div class="flex items-center text-orange-600 space-x-1">
            <Icon icon="mdi:location" />
            <p>{{ state.job.location }}</p>
          </div>
        </div>
        <div class="card space-y-2">
          <p>{{ state.job.description }}</p>
          <p class="font-semibold text-end">{{ state.job.salary }} / Year</p>
        </div>
      </div>
      <div class="col-span-4 space-y-4">
        <div class="card">
          <p class="text-lg font-semibold">{{ state.job.company.name }}</p>
          <p>{{ state.job.company.description }}</p>
        </div>
        <div class="card">
          <p class="text-lg font-semibold">Contact Info</p>
          <p class="flex rounded-md items-center bg-gray-300 p-2 my-2">
            <Icon icon="mdi-phone" class="text-green-600 me-2" />{{
              state.job.company.contactPhone
            }}
          </p>
          <p class="flex rounded-md items-center bg-gray-300 p-2">
            <Icon icon="mdi-email" class="text-green-600 me-2" />{{
              state.job.company.contactEmail
            }}
          </p>
        </div>

        <div class="card space-y-2">
          <p class="text-lg font-semibold">Manage Job</p>
          <button @click="handleEdit" class="btn btn-primary w-full">
            <Icon icon="mdi-edit" /><span>Edit</span>
          </button>
          <button @click="handleDelete" class="btn btn-danger w-full" :disabled="isDeleting">
            <Icon icon="mdi-trash" /><span>{{ isDeleting ? "Deleting..." : "Delete"}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Back from "../components/Back.vue";
import axios from "axios";
import { deleteJob, getJob } from "../lib/appWrite/api";
import Loader from "../components/Loader.vue";

const state = reactive({ job: {}, isLoading: true });
const isDeleting = ref(false);
const { params } = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const data = await getJob(params.id);
    state.job = data;
  } catch (error) {
    console.log("Error:", error);
  } finally {
    state.isLoading = false;
  }
});
const handleDelete = async () => {
  isDeleting.value = true;
  await deleteJob(params.id)
  router.back();
};
const handleEdit = () => {
  router.push(`/jobs/edit/${params.id}`);
};
</script>

<style lang="scss" scoped></style>
