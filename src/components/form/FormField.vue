<template>
  <div v-if="type === 'text'" class="flex flex-col">
    <label :for="name" class="font-semibold">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :class="['input', isError ? 'border-red-500' : 'border-gray-400']"
      :placeholder="placeholder"
      :name="name"
      v-model="value"
    />
    <small class="text-red-500" v-if="isError">
      {{ errorMessage }}
    </small>
  </div>

  <div v-else-if="type === 'textarea'" class="flex flex-col">
    <label :for="name" class="font-semibold">{{ label }}</label>
    <textarea
      rows="5"
      :id="name"
      :type="type"
      :class="['input', isError ? 'border-red-500' : 'border-gray-400']"
      :placeholder="placeholder"
      :name="name"
      v-model="value"
    ></textarea>
    <small class="text-red-500" v-if="isError">
      {{ errorMessage }}
    </small>
  </div>

  <div v-else-if="type === 'select'" class="flex flex-col">
    <label for="type">{{ label }}</label>
    <select
      :id="name"
      :class="['input', isError ? 'border-red-500' : 'border-gray-400']"
      :name="name"
      v-model="value"
    >
      <option v-for="type in data" :value="type">{{ type }}</option>
    </select>
    <small class="text-red-500" v-if="isError">
      {{ errorMessage }}
    </small>
  </div>

  <div v-if="type === 'file'" class="flex flex-col">
    <label :for="name" class="font-semibold">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :class="['input', isError ? 'border-red-500' : 'border-gray-400']"
      :name="name"
      :accept="accept"
      @change="handleFile"
    />
    <small class="text-red-500" v-if="isError">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String },
  label: { type: String },
  name: { type: String },
  placeholder: { type: String },
  isError: { type: Boolean },
  errorMessage: { type: String },
  data: { type: Array},
  accept: {type: String},
});
const value = defineModel();
const emit = defineEmits(['handleFile'])
const handleFile = (e) => {
  emit('handleFile', e)
}
</script>

<style lang="scss" scoped></style>
