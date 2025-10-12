<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref<string>("");

// expose.
// This allows the parent component to access the searchQuery ref. A bit similar to React's useImperativeHandle.
defineExpose({
  searchQuery,
});
</script>

<template>
  <div>
    <input v-model="searchQuery" type="text" placeholder="Search name..." />
  </div>
</template>

<style scoped>
input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}
</style>
