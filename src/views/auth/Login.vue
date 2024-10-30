<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <p class="text-lg font-semibold text-center mt-4">Login</p>
      <FormField
        type="text"
        label="Your Email"
        name="email"
        v-model="form.email"
        placeholder="test@example.com"
        :isError="v$.email?.$error"
        :errorMessage="v$.email.$errors[0]?.$message"
      />
      <FormField
        type="text"
        label="Password"
        name="password"
        v-model="form.password"
        :isError="v$.password?.$error"
        :errorMessage="v$.password.$errors[0]?.$message"
      />
      <button class="btn btn-primary" type="submit" :disabled="isPending">
        {{ isPending ? "Logging In..." : "Login" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import FormField from "../../components/form/FormField.vue";
import useVuelidate from "@vuelidate/core";
import { userSinginRules } from "../../lib/validation";
import { useRouter } from "vue-router";
import { useSignIn } from "../../lib/appWrite/query/profileQuery";

const router = useRouter();
const { mutate, isPending } = useSignIn();
const form = reactive({
  email: "",
  password: "",
});
const v$ = useVuelidate(userSinginRules, form);

const handleSubmit = () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    const user = mutate(form);
    console.log(user);
    router.push("/");
  }
};
</script>

<style lang="scss" scoped></style>
