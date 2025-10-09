<script setup lang="ts">
import type { User } from "@/types/models";

const props = defineProps<{
  filteredUsers: User[];
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

table tbody tr {
  cursor: pointer;
}
</style>
