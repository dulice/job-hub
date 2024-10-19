<template>
    <div class="bg-green-100">
        <div class="max-w-5xl flex justify-between items-center mx-auto p-2">
            <RouterLink to="/">
                <img :src="Logo" alt="" class="w-10 rounded-full object-contain"/>
            </RouterLink>
            <nav class="flex space-x-2">    
                <RouterLink to="/" :class="['link', route.path === '/'? 'bg-green-300' : '']">home</RouterLink>
                <RouterLink to="/jobs" :class="['link', route.path === '/jobs'? 'bg-green-300' : '']">jobs</RouterLink>
                <RouterLink to="/jobs/add" :class="['link', route.path === '/jobs/add'? 'bg-green-300' : '']">Add job</RouterLink>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import Logo from '../assets/logo.png'
const route = useRoute();

</script>

<style lang="scss" scoped>

</style>