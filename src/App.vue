<template>
    <Navbar />
    <div class="mt-16">
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import 'vue3-toastify/dist/index.css';
</script>