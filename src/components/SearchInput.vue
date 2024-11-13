<template>
  <div class="hero">
    <div class="flex justify-center items-center min-h-32">
      <form
        @submit.prevent="handleSearch"
        class="w-full sm:w-auto flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-x-2 mb-10"
      >
        <FormField
          placeholder="Job title"
          type="text"
          v-model="form.title"
          label="What:"
          :isError="isError"
        />
        <FormField
          placeholder="Miami, FL"
          type="text"
          v-model="form.location"
          label="Where:"
        />
        <button type="submit" class="btn btn-primary" :disabled="form.title.trim().length < 1">Seek</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import FormField from "./form/FormField.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isError = ref(false);
const form = reactive({
  title: "",
  location: "",
});

const handleSearch = () => {
  if (form.title.trim().length < 1) {
    isError.value = true;
  } else {
    router.push({
      path: "/jobs/search",
      query: { q: form.title, location: form.location },
    });
  }
};


</script>

<style scoped>
.hero {
  background-image: url("../../assets/hero.jpeg");
  background-position: center;
}
</style>
