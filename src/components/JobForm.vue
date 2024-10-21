<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-2">
      <FormField
        type="text"
        label="Job Title:"
        name="title"
        v-model="form.title"
        placeholder="Vue Develper"
        :isError="v$.title?.$error"
        :errorMessage="v$.title.$errors[0]?.$message"
      />
      <FormField
        type="text"
        label="Job location:"
        name="location"
        v-model="form.location"
        placeholder="NY,UK"
        :isError="v$.location?.$error"
        :errorMessage="v$.location.$errors[0]?.$message"
      />
      <FormField
        type="textarea"
        label="Job Description:"
        name="description"
        v-model="form.description"
        placeholder="Descrption..."
        :isError="v$.description?.$error"
        :errorMessage="v$.description.$errors[0]?.$message"
      />
      <div class="grid grid-cols-2 gap-2">
        <FormField
          type="select"
          label="Job Type:"
          name="type"
          v-model="form.type"
          :isError="v$.type?.$error"
          :errorMessage="v$.type.$errors[0]?.$message"
          :data="types"
        />
        <FormField
          type="select"
          label="Salary:"
          name="salary"
          v-model="form.salary"
          :isError="v$.salary?.$error"
          :errorMessage="v$.salary.$errors[0]?.$message"
          :data="salaries"
        />
      </div>

      <!-- action -->
      <div class="flex justify-end">
        <button
          v-if="status === 'add'"
          :disabled="isAdding"
          class="btn btn-dark"
        >
          {{ isAdding ? "Adding Job..." : "Add Job" }}
        </button>
        <button v-else class="btn btn-primary" :disabled="isUpdating">
          {{ isUpdating ? "Updating Job..." : "Update Job" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAddJob, useGetJob, useGetUser, useUpdateJob } from "../lib/appWrite/queries";
import { rules } from "../lib/validation";
import { salaries, types } from "../lib/data";
import FormField from "./FormField.vue";
const router = useRouter();
const { params } = useRoute();
const props = defineProps({ status: String });
const { mutate: addJob, isPending: isAdding } = useAddJob();
const { mutate: putJob, isPending: isUpdating } = useUpdateJob();
const {data: user} = useGetUser();

const form = reactive({
  title: "",
  type: "",
  description: "",
  location: "",
  salary: "",
  company: user.value.$id,
});

const v$ = useVuelidate(rules, form);

onMounted(() => {
  if (props.status === "edit") {
    const { data: job } = useGetJob(params.id);
    const data = job.value;
    if (data) {
      form.title = data.title;
      form.description = data.description;
      form.salary = data.salary;
      form.type = data.type;
      form.location = data.location;
    }
  }
});

const handleSubmit = () => {
  v$.value.$touch();
  try {
    if (props.status === "add") {
      if (!v$.value.$error) {
        addJob(form);
        router.push("/jobs");
      }
    } else if (props.status === "edit") {
      if (!v$.value.$error) {
        putJob({ id: params.id, data: form });
        router.push(`/jobs/${params.id}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
