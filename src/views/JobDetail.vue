<template>
  <div class="container">
    <Back link="/jobs" />
    <Loader v-if="isPending" />
    <div v-else class="grid grid-cols-12 gap-4">
      <div class="col-span-8 space-y-4">
        <div class="card space-y-2">
          <small>{{ job.type }}</small>
          <p class="text-lg font-semibold">
            {{ job.title }}
          </p>
          <div class="flex items-center text-orange-600 space-x-1">
            <Icon icon="mdi:location" />
            <p>{{ job.location }}</p>
          </div>
        </div>
        <div class="card space-y-2">
          <p>{{ job.description }}</p>
          <p class="font-semibold text-end">{{ job.salary }} / Year</p>
        </div>
      </div>
      <div class="col-span-4 space-y-4">
        <div class="card">
          <RouterLink
            :to="`/profile/${job.company?.$id}`"
            class="text-lg font-semibold hover:text-green-600"
            >{{ job.company.name }}</RouterLink
          >
          <p>{{ job.company.description }}</p>
        </div>
        <div class="card">
          <p class="text-lg font-semibold">Contact Info</p>
          <p class="flex rounded-md items-center bg-gray-300 p-2 my-2">
            <Icon icon="mdi-phone" class="text-green-600 me-2" />{{
              job.company.phone
            }}
          </p>
          <p class="flex rounded-md items-center bg-gray-300 p-2">
            <Icon icon="mdi-email" class="text-green-600 me-2" />{{
              job.company.email
            }}
          </p>
        </div>

        <div v-if="user.$id === job.company.$id" class="card space-y-2">
          <p class="text-lg font-semibold">Manage Job</p>
          <button @click="handleEdit" class="btn btn-primary w-full">
            <Icon icon="mdi-edit" /><span>Edit</span>
          </button>
          <button
            @click="handleDelete"
            class="btn btn-danger w-full"
            :disabled="isDeleting"
          >
            <Icon icon="mdi-trash" /><span>{{
              isDeleting ? "Deleting..." : "Delete"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Back from "../components/Back.vue";
import Loader from "../components/Loader.vue";
import { useDeleteJob, useGetJob, useGetUser } from "../lib/appWrite/queries";

const { params } = useRoute();
const router = useRouter();
const { data: user } = useGetUser();
const { data: job, isPending } = useGetJob(params.id);
const { mutate, isPending: isDeleting } = useDeleteJob();
const handleDelete = async () => {
  mutate(params.id);
  router.back();
};
const handleEdit = () => {
  router.push(`/jobs/edit/${params.id}`);
};
</script>

<style lang="scss" scoped></style>
