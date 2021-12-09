<template>
  <el-table ref="ElTable" v-bind="$props" v-on="$listeners">
    <template v-for="(col, index) in cols">
      <slot :name="col.prop" :row="col">
        <ElDynamicTableColumn :key="index" v-bind="col" />
      </slot>
    </template>
    <template slot="empty">
      <slot name="empty">
        <el-empty />
      </slot>
    </template>
    <!-- 空数据下仍显示 -->
    <template slot="empty-append">
      <slot name="append" />
    </template>
    <!-- 空数据下不显示 -->
    <template v-if="data && data.length > 0" slot="append">
      <slot name="append">
        <el-pagination v-bind="pagination" v-on="$listeners" @current-change="currentPageChange" />
      </slot>
    </template>
  </el-table>
</template>
<script>
// import ElDynamicTable from "../dynamic-table/main.vue";
import { Pagination } from "element-ui";
export default {
  name: "ElPageableTable",
  // components: { ElDynamicTable },
  // extends: ElDynamicTable,
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    console.log(this);
  },
  methods: {
    ...Pagination.methods,
    currentPageChange(val) {
      this.$emit("current-page-change", val);
    },
  },
};
</script>
