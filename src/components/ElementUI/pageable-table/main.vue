<template>
  <ElDynamicTable v-bind="$props" v-on="$listeners">
    <template slot="append">
      <el-pagination v-bind="pagination" v-on="$listeners" @current-change="currentPageChange" />
    </template>
  </ElDynamicTable>
</template>
<script>
import ElDynamicTable from "../dynamic-table/main.vue";
import { Pagination } from "element-ui";
export default {
  name: "ElPageableTable",
  components: { ElDynamicTable },
  extends: ElDynamicTable,
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...Pagination.methods,
    currentPageChange(val) {
      this.$emit("current-page-change", val);
    },
  },
  created() {
    console.log(this);
  },
};
</script>
