<template>
    <div class="container card my-4">
        <Back />
        <p class="font-semibold text-lg text-center">Add Job</p>
        <JobForm status="add"/>
    </div>
</template>

<script setup>
import Back from '../components/Back.vue';
import JobForm from '../components/form/JobForm.vue';


</script>

<style lang="scss" scoped>

</style>