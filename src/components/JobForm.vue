<template>
  <Loader v-if="isLoading && status === 'edit'" />
  <form v-else @submit.prevent="handleSubmit">
    <div class="space-y-2">
      <div class="flex flex-col">
        <label for="title">Job Title:</label>
        <input
          id="title"
          type="text"
          class="input"
          placeholder="Vue Developer"
          name="title"
          v-model="form.title"
        />
      </div>
      <div class="flex flex-col">
        <label for="location">Job location:</label>
        <input
          id="location"
          type="text"
          class="input"
          placeholder="NY,UK"
          name="location"
          v-model="form.location"
        />
      </div>
      <div class="flex flex-col">
        <label for="description">Job Description:</label>
        <textarea
          id="description"
          rows="5"
          class="input"
          placeholder="Descrption..."
          name="description"
          v-model="form.description"
        ></textarea>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col">
          <label for="type">Job Type:</label>
          <select id="type" class="input" name="type" v-model="form.type">
            <option value="0" disabled default>Select Job Type</option>
            <option v-for="type in types" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="salary">Salary:</label>
          <select id="salary" class="input" name="salary" v-model="form.salary">
            <option v-for="salary in salaries" :value="salary">
              {{ salary }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div class="h-[1px] bg-slate-600 my-6"></div>
      </div>
      <p class="font-semibold text-lg">Company Details</p>
      <div class="flex flex-col">
        <label for="name">Company name:</label>
        <input
          id="name"
          type="text"
          class="input"
          placeholder="Tesla"
          name="name"
          v-model="form.company.name"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col">
          <label for="email">Email:</label>
          <input
            id="email"
            type="text"
            class="input"
            placeholder="NY,UK"
            name="email"
            v-model="form.company.contactEmail"
          />
        </div>
        <div class="flex flex-col">
          <label for="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            class="input"
            placeholder="NY,UK"
            name="phone"
            v-model="form.company.contactPhone"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <label for="Cdescription">Description:</label>
        <textarea
          id="Cdescription"
          rows="5"
          class="input"
          placeholder="Descrption..."
          name="description"
          v-model="form.company.description"
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button v-if="status === 'add'" :disabled="isAdding" class="btn btn-dark">{{ isAdding ? 'Adding Job...' : 'Add Job'}}</button>
        <button v-else class="btn btn-primary" :disabled="isUpdating">{{  isUpdating ? 'Updating Job...' : 'Update Job' }}</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { addJob, getJob, putJob } from "../lib/appWrite/api";
import Loader from "./Loader.vue";

const router = useRouter();
const { params } = useRoute();
const props = defineProps({ status: String });
const types = ref(["Full-Time", "Part-Time", "Intership", "Remote"]);
const salaries = ref(["$50K - $60K", "$60K - $70K", "$70K - $80K", "$80K - $90K"]);
const isLoading = ref(true);
const isAdding = ref(false);
const isUpdating = ref(false);
const form = reactive({
  title: "",
  type: "",
  description: "",
  location: "",
  salary: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

onMounted(async () => {
  if (props.status === "edit") {
    try {
      const data = await getJob(params.id)
      if(data) {
        form.title = data.title;
        form.description = data.description;
        form.salary = data.salary;
        form.type = data.type;
        form.location = data.location;
        form.company.name = data.company.name;
        form.company.description = data.company.description;
        form.company.contactEmail = data.company.contactEmail;
        form.company.contactPhone = data.company.contactPhone;
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      isLoading.value = false;
    }
  }
});

const handleSubmit = async () => {
  try {
    if (props.status === "add") {
      isAdding.value = true;
      const data = await addJob(form);
      if (data) {
        router.push("/jobs");
      }
    } else if (props.status === "edit") {
      isUpdating.value = true
      const data = await putJob(params.id, form);
      if (data) {
        router.push("/jobs");
      }
    }
    console.log(form);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
