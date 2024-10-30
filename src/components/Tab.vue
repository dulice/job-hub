<template>
    <div>
        <div class="flex mb-4">
          <button
            @click="selectedTab(tab.name)"
            v-for="tab in tabs"
            :class="[currentTab === tab.name ? 'border-b-green-500 text-green-700' : '']"
            class="py-2 px-10 border-2 hover:bg-green-100"
          >
            {{ tab.name }}
          </button>
        </div>
    </div>
    <AppliedCard v-if="currentTab === 'applied'"/>
    <Save v-else/>
</template>

<script setup>
import { ref } from "vue";
import AppliedCard from "./AppliedCard.vue";
import Save from "./Save.vue";

const tabs = [
  { name: "applied", component: AppliedCard },
  { name: "saved", component: Save },
];
const currentTab = ref("applied");
const selectedTab = (tab) => {
  currentTab.value = tab;
};
</script>

<style scoped>
</style>
