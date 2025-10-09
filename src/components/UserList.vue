<script setup lang="ts">
import { ref } from "vue";
import type { User, Post } from "@/types/models";

// components
import Posts from "./Posts.vue";
import UserListTable from "./UserListTable.vue";
import SearchFilter from "./SearchFilter.vue";

// state
const searchQuery = ref<string>("");
const selectedUser = ref<User | null>(null);
const posts = ref<Post[]>([]);

// methods
const getUserPosts = async (user: User) => {
  selectedUser.value = user;
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + user.id
    );
    posts.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div id="wrapper">
    <SearchFilter v-model:searchQuery="searchQuery" />
    <UserListTable :searchQuery="searchQuery" :getUserPosts="getUserPosts" />
    <br />
    <div v-if="selectedUser">
      <p id="user-name">{{ selectedUser.name }}'s Posts</p>
      <Posts :posts="posts" />
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
