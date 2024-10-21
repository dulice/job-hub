<template>
  <div class="container">
    <Back />
    <form class="card" @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <p class="text-lg font-semibold text-center mt-4">
          Update your details
        </p>
        <FormField
          type="text"
          label="Company Name"
          name="name"
          v-model="form.name"
          placeholder="Tesla"
          :isError="v$.name?.$error"
          :errorMessage="v$.name.$errors[0]?.$message"
        />
        <div class="flex flex-col">
          <label>Email</label>
          <input
            type="text"
            class="input text-gray-500 border-gray-400"
            v-model="form.email"
            disabled
          />
        </div>
        <FormField
          type="text"
          label="Contact Phone"
          name="phone"
          v-model="form.phone"
          placeholder="555-555-5555"
          :isError="v$.phone?.$error"
          :errorMessage="v$.phone.$errors[0]?.$message"
        />
        <FormField
          type="textarea"
          label="About company"
          name="description"
          v-model="form.description"
          :isError="v$.description?.$error"
          :errorMessage="v$.description.$errors[0]?.$message"
        />
        <div class="flex justify-end">
          <button class="btn btn-primary" type="submit" :disabled="isPending">
            {{ isPending ? "Updating..." : "Update" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import FormField from "../components/FormField.vue";
import useVuelidate from "@vuelidate/core";
import Back from "../components/Back.vue";
import { userUpdateRules } from "../lib/validation";
import { useRoute, useRouter } from "vue-router";
import { useGetCompany, useUpdateUser } from "../lib/appWrite/queries";

const router = useRouter();
const { params } = useRoute();
const { data, isSuccess } = useGetCompany(params.id);
const { mutate, isPending } = useUpdateUser();
const form = reactive({
  name: "",
  email: "",
  phone: "",
  description: "",
  isCompany: "",
});
const v$ = useVuelidate(userUpdateRules, form);

onMounted(() => {
  if(isSuccess) {
    form.name = data.value.name;
    form.email = data.value.email;
    form.phone = data.value.phone;
    form.description = data.value.description;
    form.isCompany = data.value.isCompany;
  }
})
const handleSubmit = () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    mutate({ id: data.value.$id, data: form });
    router.push(`/profile/${data.value.$id}`);
  }
};
</script>

<style lang="scss" scoped></style>
