<script setup lang="ts">
import { ref } from "vue";

// components
import PostsTable from "./PostsTable.vue";
import UsersTable from "./UsersTable.vue";
import SearchFilter from "./SearchFilter.vue";

// state
const searchRef = ref();
const usersTableRef = ref();
</script>

<template>
  <div id="wrapper">
    <!-- Search Filter -->
    <SearchFilter ref="searchRef" />
    <!-- User Table -->
    <UsersTable ref="usersTableRef" :searchQuery="searchRef?.searchQuery" />

    <div v-if="usersTableRef?.selectedUser" class="mt-30">
      <template v-if="usersTableRef?.filteredUsers.length > 0">
        <p id="user-name">{{ usersTableRef.selectedUser.name }}'s Posts</p>
        <!-- User Posts Table -->
        <PostsTable :posts="usersTableRef?.posts" />
      </template>
    </div>
  </div>
</template>

<style>
.mt-30 {
  margin-top: 30px;
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
