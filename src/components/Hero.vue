<template>
    <div class="hero">
        <div class="flex justify-center items-center h-32">
            <form action="" class="flex items-end space-x-2 mb-10">
                <div>
                    <label for="search" class="block font-semibold">What</label>
                    <input id="search" type="text" placeholder="Job title" class="input" />
                </div>
                <input type="text" placeholder="Job title" class="input" />
                <div>
                    <label for="where" class="block font-semibold">Where:</label>
                    <input id="where" type="text" placeholder="Job title" class="input" />
                </div>
                <button class="btn btn-primary">Seek</button>
            </form>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4 my-4">
        <div class="card space-y-2">
            <p class="font-semibold text-lg">For Developers</p>
            <p>Browser our jobs to become developer today</p>
            <button @click="router.push('/jobs')" class="btn btn-dark">Explore jobs</button>
        </div>
        <div class="card-primary space-y-2">
            <p class="font-semibold text-lg">For Employers</p>
            <p>List your job to find the perfect developer for your role.</p>
            <button @click="router.push('/jobs/add')" class="btn btn-primary">Add jobs</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.hero {
  background-image: url('../../assets/hero.jpeg');
  background-position: center;
}
</style>
