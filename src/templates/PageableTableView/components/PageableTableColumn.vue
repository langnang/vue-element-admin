<template>
  <!-- <component :is="componentName" v-bind="$props" :name="prop">
    <PageableTableColumn v-for="(col, index) in children" :key="index" v-bind="col" />
  </component> -->
  <el-table-column v-bind="$props" v-on="$listeners">
    <template v-if="isSlot" v-slot="{ $index, row }" :name="prop">
      <slot name="type" />
      {{ $index }},{{ row[prop] }}
      <!-- <slot v-if="isSlot" :name="prop" :row="row" :$index="$index"></slot> -->
      <!-- <span v-else> {{ row[prop] }}</span> -->
    </template>
  </el-table-column>
</template>
<script>
import { TableColumn } from "element-ui";

export default {
  name: "PageableTableColumn",
  props: {
    ...TableColumn.props,
    isSlot: {
      type: Boolean,
      default: false,
    },
    component: {
      type: String,
      default: null,
    },
    children: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    componentName() {
      if (this.isSlot) return "slot";
      if (this.component) return this.component;
      return "el-table-column";
    },
  },
  created() {},
};
</script>
