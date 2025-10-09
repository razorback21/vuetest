<script setup lang="ts">
const props = defineProps<{
  searchQuery: string;
}>();

const emit = defineEmits<{
  "update:searchQuery": [value: string];
}>();
</script>

<template>
  <div>
    <input
      :value="searchQuery"
      @input="
        emit('update:searchQuery', ($event.target as HTMLInputElement).value)
      "
      type="text"
      placeholder="Search name..."
    />
  </div>
</template>
