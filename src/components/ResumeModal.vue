<template>
  <div
    v-if="isOpenModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div
      class="bg-white rounded-lg shadow-xl max-w-2xl w-full h-[calc(100vh-5rem)] p-6 overflow-y-scroll">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-green-500">
          {{ user.firstName + " " + user.lastName }}
        </h2>
        <button
          @click="$emit('closeModal')"
          class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi-close" class="text-2xl" />
        </button>
      </div>

      <div class="mt-4">
        <table>
          <tbody>
            <tr>
              <td class="font-semibold px-4 py-2 align-top text-nowrap">
                Email:
              </td>
              <td class="px-4 py-2">{{ user.email }}</td>
            </tr>
            <tr>
              <td class="font-semibold px-4 py-2 align-top text-nowrap">
                Phone:
              </td>
              <td class="px-4 py-2">{{ user.phoneNumber }}</td>
            </tr>
            <tr>
              <td class="font-semibold px-4 py-2 align-top text-nowrap">
                Location:
              </td>
              <td class="px-4 py-2">{{ user.location }}</td>
            </tr>
            <tr>
              <td class="font-semibold px-4 py-2 align-top text-nowrap">
                Expected Salary:
              </td>
              <td class="px-4 py-2">{{ user.expectedSalary }}</td>
            </tr>
            <tr>
              <td class="font-semibold px-4 py-2 align-top text-nowrap">
                Cover Letter:
              </td>
              <td class="px-4 py-2">{{ user.coverLetter }}</td>
            </tr>
            <tr>
              <td class="font-semibold px-4 py-2 align-top text-nowrap">
                Resume:
              </td>
              <td class="px-4 py-2">
                <a
                  :href="user.resume"
                  target="_blank"
                  class="bg-orange-300 rounded px-4 py-2 flex items-center gap-2 w-max"
                  download
                  ><Icon icon="mdi-eye" /><span>View Resume</span></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex justify-end space-x-4">
        <button @click="$emit('closeModal')" class="btn-disable">Cancel</button>
        <button @click="$emit('closeModal')" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
defineEmits(["closeModal"]);
defineProps({
  isOpenModal: Boolean,
  user: Object,
});
</script>
