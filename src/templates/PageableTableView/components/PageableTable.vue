<template>
  <div>
    <el-table border size="mini" v-bind="$props" v-on="$listeners">
      <!-- <template v-for="(col, index) in cols">
        <PageableTableColumn :key="index" align="center" show-overflow-tooltip v-bind="col" />
      </template> -->
      <el-table-column v-for="(col, index) in cols" :key="index" align="center" show-overflow-tooltip v-bind="col">
        <template v-if="col.isSlot" v-slot="{ $index, row }">
          <slot :name="col.prop" v-bind="{ $index, row }" />
        </template>
      </el-table-column>
      <template v-slot:empty>
        <el-empty />
      </template>
    </el-table>
    <el-pagination
      v-if="$props.data.length !== 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      :total="pagination.total || 0"
      :current-page="pagination.page || 1"
      :page-size="pagination.size || 10"
      v-bind="pagination"
      v-on="$listeners"
      @current-change="
        (val) => {
          this.$emit('current-page-change', val);
        }
      "
    />
  </div>
</template>
<script>
import { Table, Pagination } from "element-ui";
// import PageableTableColumn from "./PageableTableColumn.vue";
export default {
  name: "PageableTable",
  // components: { PageableTableColumn },
  extends: Table,
  props: {
    cols: {
      type: Array,
      default() {
        return [];
      },
    },
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    bodyWrapper() {
      return this.$children[0].bodyWrapper;
    },
  },
  watch: {},
  created() {},
  mounted() {
    console.log("PageableTable::mounted::this.$children[0]", this.$children[0]);
  },
  methods: {
    ...Pagination.methods,
  },
};
</script>
