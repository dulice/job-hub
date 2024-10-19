<template>
    <div class="container card my-4">
        <Back />
        <p class="font-semibold text-lg text-center">Edit Job</p>
        <JobForm status="edit"/>
    </div>
</template>

<script setup>
import Back from '../components/Back.vue';
import JobForm from '../components/JobForm.vue';


</script>

<style lang="scss" scoped>

</style>