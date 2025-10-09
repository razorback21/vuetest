<script setup lang="ts">
import type { Post } from "@/types/models";

// props
const props = defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in props.posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
