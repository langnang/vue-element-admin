<template>
  <div>
    <el-table>
      <el-table-column prop="name"></el-table-column>
      <el-table-column prop="column"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // 关联表
  name: "AssociationTable",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      table: "",
      columns: [],
    };
  },
};
</script>

<style></style>
