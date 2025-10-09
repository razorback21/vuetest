<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import type { User } from "@/types/models";

// state
const users = ref<User[]>([]);

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

// props
const props = defineProps<{
  searchQuery: string;
  getUserPosts: (user: User) => void;
}>();
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
