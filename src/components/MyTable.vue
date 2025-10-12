<script setup lang="ts">
// types
type GetRowDataFn = (row: any) => any[];

// props
defineProps<{
  headers: string[];
  rows: any[];
  rowKey: string;
  getRowData: GetRowDataFn;
  tableId?: string;
  cursorPointer?: boolean;
}>();

// emits
const emit = defineEmits<{
  (e: "rowClick", row: any): void;
}>();

// methods
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
