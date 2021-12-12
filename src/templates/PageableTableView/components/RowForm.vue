<template>
  <el-row :gutter="10">
    <el-form v-model="value" v-bind="$props">
      <el-col v-for="(col, index) in cols" :key="index" :span="col.span || 24">
        <el-form-item v-bind="col.item">
          <component :is="col.component ? col.component.is || 'span' : 'span'" v-model="value[col.item.prop]" v-bind="col.component || {}" />
        </el-form-item>
      </el-col>
      <slot />
    </el-form>
  </el-row>
</template>
<script>
import { Form } from "element-ui";
export default {
  extends: Form,
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    cols: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
