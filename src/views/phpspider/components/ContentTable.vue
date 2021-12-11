<template>
  <el-table size="mini" :data="data" border>
    <el-table-column align="center" show-overflow-tooltip type="index" label="序号" />
    <el-table-column align="center" show-overflow-tooltip prop="url" label="URL" />
    <el-table-column align="center" show-overflow-tooltip prop="title" label="TITLE" />
    <el-table-column v-for="(col, index) in cols" :key="index" align="center" show-overflow-tooltip :label="col.description || col.name" :prop="'content.' + col.name" />
  </el-table>
</template>
<script>
export default {
  name: "PhpSpiderContentTable",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    cols: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
