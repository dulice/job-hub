<template>
  <div>
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2 gap-4">
        <FormField
          type="text"
          label="First Name"
          name="fname"
          v-model="form.firstName"
          placeholder="John"
          :isError="v$.firstName?.$error"
          :errorMessage="v$.firstName?.$errors[0]?.$message" />
        <FormField
          v-model="form.lastName"
          type="text"
          name="lname"
          label="Last Name"
          :isError="v$.lastName.$error"
          :errorMessage="v$.lastName?.$errors[0]?.$message" />
      </div>
      <FormField
        type="text"
        name="location"
        label="Your Location"
        v-model="form.location"
        :isError="v$.location.$error"
        :errorMessage="v$.location?.$errors[0]?.$message" />
      <FormField
        v-model="form.phoneNumber"
        type="text"
        name="phone"
        label="Your Phone Number"
        :isError="v$.phoneNumber.$error"
        :errorMessage="v$.phoneNumber?.$errors[0]?.$message" />
      <FormField
        v-model="form.email"
        type="text"
        name="email"
        label="Your Email"
        :isError="v$.email.$error"
        :errorMessage="v$.email?.$errors[0]?.$message" />
      <FormField
        type="select"
        label="Salary:"
        name="salary"
        v-model="form.expectedSalary"
        :isError="v$.expectedSalary?.$error"
        :errorMessage="v$.expectedSalary.$errors[0]?.$message"
        :data="salaries" />
      <FormField
        @handleFile="handelChange"
        type="file"
        name="resume"
        label="Your Resume"
        accept=".pdf, .doc, .docx, .txt"
        :isError="v$.resume.$error"
        :errorMessage="v$.resume?.$errors[0]?.$message" />
      <FormField
        v-model="form.coverLetter"
        type="textarea"
        name="cv"
        label="Cover Letter"
        placeholder="Introduce yourself and briefly explain why you are suitable for this role. Consider your relevant skills, qualifications and related experience."
        :isError="v$.coverLetter.$error"
        :errorMessage="v$.coverLetter?.$errors[0]?.$message" />
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary" :disabled="isPending">
          {{ isPending ? "Submitting..." : "Submit" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import FormField from "./FormField.vue";
import useVuelidate from "@vuelidate/core";
import { applyRules } from "../../lib/validation";
import { postResume } from "../../lib/appWrite/api/applyApi";
import { useGetUser } from "../../lib/appWrite/query/profileQuery";
import { salaries } from "../../lib/data";
import { useApplyJob } from "../../lib/appWrite/query/applyQuery";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  job: Object,
});
const { data: user } = useGetUser();
const router = useRouter();
const { params } = useRoute();
const { mutate } = useApplyJob();

const form = reactive({
  firstName: "",
  lastName: "",
  location: "",
  phoneNumber: "",
  email: "",
  expectedSalary: "",
  resume: [],
  coverLetter: "",
  job: params.jobId,
  user: user.value.$id,
});
const isPending = ref(false);
const v$ = useVuelidate(applyRules, form);

onMounted(() => {
  form.email = user.value?.email;
  form.phoneNumber = user.value?.phone;
});

const handelChange = (e) => {
  form.resume = e.target.files[0];
};

const handleSubmit = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    isPending.value = true;
    const filePreview = await postResume(form.resume);
    mutate({
      ...form,
      resume: filePreview,
    });
    isPending.value = false;
    toast.success("Your application has been submitted");
    setTimeout(() => {
      router.push("/jobs");
    }, 2000);
  }
};
</script>

<style lang="scss" scoped></style>
