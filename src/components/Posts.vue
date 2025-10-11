<script setup lang="ts">
import type { Post } from "@/types/models";
import MyTable from "./MyTable.vue";

// props
const props = defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <div>
    <MyTable
      :tableId="'posts-table'"
      :headers="['Title', 'Body']"
      :rows="props.posts"
      :rowKey="'id'"
      :getRowData="(post) => [post.title, post.body]"
    />
  </div>
</template>
