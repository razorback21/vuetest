<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import type { Post, User } from "@/types/models";

// state
const users = ref<User[]>([]);
const selectedUser = ref<User>();
const posts = ref<Post[]>([]);

// lifecycles
onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    users.value = await response.json();
  } catch (error) {
    console.error(error);
  }
});

// computed
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

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

// props
const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
});

// expose
// This allows the parent component to access the selectedUser, posts ref. A bit similar to React's useImperativeHandle.
defineExpose({
  selectedUser,
  posts,
});
</script>

<template>
  <table id="users-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in filteredUsers"
        :key="user.id"
        @click="getUserPosts(user)"
      >
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.address.city }}</td>
        <td>{{ user.company.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table tbody tr {
  cursor: pointer;
}
</style>
