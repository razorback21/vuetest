<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// types
interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

// components
import Posts from "./Posts.vue";

// state
const users = ref<User[]>([]);
const searchQuery = ref<string>("");
const selectedUser = ref<User | null>(null);
const posts = ref<Post[]>([]);

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
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// method
const getUseerPosts = (user: User) => {
  selectedUser.value = user;
  (async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=" + user.id
      );
      posts.value = await response.json();
    } catch (error) {
      console.error(error);
    }
  })();
};
</script>

<template>
  <div>
    <div>
      <input v-model="searchQuery" type="text" placeholder="Search name..." />
    </div>
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
          @click="getUseerPosts(user)"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.city }}</td>
          <td>{{ user.company.name }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div v-if="selectedUser">
      <p id="user-name">{{ selectedUser.name }}'s Posts</p>
      <Posts :posts="posts" />
    </div>
  </div>
</template>
<style scoped>
table {
  min-width: 800px;
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
table#users-table tbody tr {
  cursor: pointer;
}
#user-name {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
