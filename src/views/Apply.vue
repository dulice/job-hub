<template>
    <Loader v-if="isPending" />
    <div v-else class="container card space-y-2 my-4">
        <p class="text-gray-600">Applying For</p>
        <p class="text-2xl font-semibold">{{ data?.title }}</p>
        <p class="text-xl">{{ data?.company.name }}</p>
        <RouterLink :to="`/jobs/${params.jobId}`" class="text-green-600 underline">View job description</RouterLink>
        <ApplyForm/>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import Loader from '../components/Loader.vue';
import ApplyForm from '../components/form/ApplyForm.vue';
import { useGetJob } from '../lib/appWrite/query/jobQuery';

const { params } = useRoute();
const { data, isPending } = useGetJob(params.jobId);

</script>

<style lang="scss" scoped>

</style>