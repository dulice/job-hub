<template>
  <div class="container">
    <div class="card space-y-4">
      <p class="text-lg font-semibold text-center mt-4">Login</p>
      <p v-if="isError" class="alert bg-red-200 text-red-700">
        Invalid credentials. Please check the email and password.
      </p>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <FormField
            type="text"
            label="Your Email"
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
          <div class="flex items-center gap-2">
            <button class="btn btn-primary" type="submit" :disabled="isPending">
              {{ isPending ? "Logging In..." : "Login" }}
            </button>
            <p>
              Don't have an account?
              <RouterLink to="/register" class="text-green-700 underline"
                >Register here.</RouterLink
              >
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import FormField from "../../components/form/FormField.vue";
import useVuelidate from "@vuelidate/core";
import { userSinginRules } from "../../lib/validation";
import { useSignIn } from "../../lib/appWrite/query/profileQuery";

const { mutate, isPending, isError } = useSignIn();
const form = reactive({
  email: "",
  password: "",
});
const v$ = useVuelidate(userSinginRules, form);

const handleSubmit = () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    mutate(form);
  }
};
</script>

<style lang="scss" scoped></style>
