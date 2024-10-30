<template>
    <div class="space-y-4">
        <div v-for="count in 3" class="animate-pulse">
          <div class="grid grid-cols-10 gap-4">
            <div class="col-span-1 bg-gray-300 w-full h-14"></div>
            <div class="col-span-9">
              <div class="bg-gray-300 h-4 rounded w-1/2 mb-2"></div>
              <div class="bg-gray-300 h-4 rounded w-1/3 mb-2"></div>
              <div class="bg-gray-300 h-4 rounded w-1/2 mb-2"></div>
              <div class="bg-gray-300 h-4 rounded w-1/4 mb-2"></div>
            </div>
          </div>
        </div>
    </div>
</template>
