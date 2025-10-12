<script setup lang="ts">
import { ref } from "vue";

// components
import Posts from "./Posts.vue";
import UserListTable from "./UserListTable.vue";
import SearchFilter from "./SearchFilter.vue";

// state
const searchRef = ref();
const userListTableRef = ref();
</script>

<template>
  <div id="wrapper">
    <!-- Search Filter -->
    <SearchFilter ref="searchRef" />
    <!-- User List Table -->
    <UserListTable
      ref="userListTableRef"
      :searchQuery="searchRef?.searchQuery"
    />

    <div v-if="userListTableRef?.selectedUser" class="mt-30">
      <template v-if="userListTableRef?.filteredUsers.length > 0">
        <p id="user-name">{{ userListTableRef.selectedUser.name }}'s Posts</p>
        <!-- User Posts Table -->
        <Posts :posts="userListTableRef?.posts" />
      </template>
    </div>
  </div>
</template>

<style>
#wrapper {
  min-width: 800px;
}
.mt-30 {
  margin-top: 30px;
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
