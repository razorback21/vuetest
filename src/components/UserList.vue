<script setup lang="ts">
import { ref } from "vue";

// components
import Posts from "./Posts.vue";
import UserListTable from "./UserListTable.vue";
import SearchFilter from "./SearchFilter.vue";

// state
const searchRef = ref<InstanceType<typeof SearchFilter>>();
const userListTableRef = ref<InstanceType<typeof UserListTable>>();
</script>

<template>
  <div id="wrapper">
    <SearchFilter ref="searchRef" />
    <UserListTable
      ref="userListTableRef"
      :searchQuery="searchRef?.searchQuery"
    />
    <br />
    <div v-if="userListTableRef?.selectedUser">
      <p id="user-name">{{ userListTableRef.selectedUser.name }}'s Posts</p>
      <Posts :posts="userListTableRef?.posts" />
    </div>
  </div>
</template>

<style>
#wrapper {
  min-width: 800px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  font-weight: bold;
  text-align: center;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}
#user-name {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
