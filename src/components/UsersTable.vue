<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import type { Post, User } from "@/types/models";
import MyTable from "./MyTable.vue";
import useApi from "@/hooks/useApi.ts";

// hooks
const { fetchData } = useApi();

// state
const users = ref<User[]>([]);
const selectedUser = ref<User>();
const posts = ref<Post[]>([]);

// lifecycles
onMounted(async () => {
  fetchData("https://jsonplaceholder.typicode.com/users", users);
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
  fetchData(
    "https://jsonplaceholder.typicode.com/posts?userId=" + user.id,
    posts
  );
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
  filteredUsers,
});
</script>

<template>
  <template v-if="filteredUsers.length > 0">
    <MyTable
      :tableId="'users-table'"
      :headers="['Name', 'Email', 'City', 'Company']"
      :rows="filteredUsers"
      :rowKey="'id'"
      :getRowData="
        (user) => [user.name, user.email, user.address.city, user.company.name]
      "
      @rowClick="getUserPosts"
      :cursorPointer="true"
    />
  </template>
  <template v-else>
    <p>No users found.</p>
  </template>
</template>
<style scoped>
table {
  width: 100%;
}
</style>
