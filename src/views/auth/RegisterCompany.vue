<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <p class="text-lg font-semibold text-center mt-4">
        Register as a Company
      </p>
      <FormField
        type="text"
        label="Company Name"
        name="name"
        v-model="form.name"
        placeholder="Tesla"
        :isError="v$.name?.$error"
        :errorMessage="v$.name.$errors[0]?.$message" />
      <FormField
        type="text"
        label="Contact Email"
        name="email"
        v-model="form.email"
        placeholder="test@example.com"
        :isError="v$.email?.$error"
        :errorMessage="v$.email.$errors[0]?.$message" />
      <FormField
        type="text"
        label="Password"
        name="password"
        v-model="form.password"
        :isError="v$.password?.$error"
        :errorMessage="v$.password.$errors[0]?.$message" />
      <FormField
        type="text"
        label="Contact Phone"
        name="phone"
        v-model="form.phone"
        placeholder="555-555-5555"
        :isError="v$.phone?.$error"
        :errorMessage="v$.phone.$errors[0]?.$message" />
      <FormField
        type="textarea"
        label="About company"
        name="description"
        v-model="form.description"
        :isError="v$.description?.$error"
        :errorMessage="v$.description.$errors[0]?.$message" />
      <div class="flex gap-4 items-center">
        <button class="btn btn-primary" type="submit" :disabled="isPending">
          {{ isPending ? "Registering..." : "Register" }}
        </button>
        <p>
          Already have an account?
          <RouterLink to="/login" class="text-green-700 underline"
            >Login here.</RouterLink
          >
        </p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import FormField from "../../components/form/FormField.vue";
import useVuelidate from "@vuelidate/core";
import { userRegisterRules } from "../../lib/validation";
import { useCreateUser } from "../../lib/appWrite/query/profileQuery";

const { mutate, isPending } = useCreateUser();
const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  description: "",
  isCompany: true,
});
const v$ = useVuelidate(userRegisterRules, form);

const handleSubmit = () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    mutate(form);
  }
};
</script>

<style lang="scss" scoped></style>
