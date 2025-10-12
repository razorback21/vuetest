<script setup lang="ts">
// props definition with types
type GetRowDataFn = (row: any) => any[];
defineProps<{
  headers: string[];
  rows: any[];
  rowKey: string;
  getRowData: GetRowDataFn;
  tableId?: string;
  cursorPointer?: boolean;
}>();

// row click event
const emit = defineEmits<{
  (e: "rowClick", row: any): void;
}>();
function onRowClick(row: any) {
  emit("rowClick", row);
}
</script>

<template>
  <table :id="tableId">
    <thead>
      <tr>
        <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
        :key="row[rowKey]"
        :class="cursorPointer && 'cursor-pointer'"
        @click="onRowClick(row)"
      >
        <td v-for="(cell, i) in getRowData(row)" :key="i">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
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
.cursor-pointer {
  cursor: pointer;
}
</style>
