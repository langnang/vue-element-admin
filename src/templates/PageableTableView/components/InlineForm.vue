<template>
  <el-form v-model="value" :inline="true" size="small" v-bind="$props">
    <slot name="prepend" />
    <el-form-item v-for="(col, index) in cols" :key="index" v-bind="col.item">
      <component :is="col.component ? col.component.is || 'span' : 'span'" v-model="value[col.item.prop]" v-bind="col.component || {}" />
    </el-form-item>
    <slot />
    <el-form-item>
      <el-button type="primary" @click="$emit('on-select')">查询</el-button>
      <el-button type="info" @click="$emit('on-reset')">重置</el-button>
    </el-form-item>
    <el-form-item style="float: right; margin-right: 0">
      <slot name="right-item-prepend" />
      <el-tooltip v-for="(item, index) in rightItem" :key="index" :effect="item.tooltip.effeck || 'dark'" :placement="item.tooltip.placement || 'bottom'" v-bind="item.tooltip" style="display: inline-block; margin-left: 10px">
        <el-button v-if="item.operate === 'insert'" circle size="mini" type="primary" icon="el-icon-plus" v-bind="item.component" @click="$emit('on-' + item.operate)" />

        <el-button v-else-if="item.operate === 'delete'" circle size="mini" type="danger" icon="el-icon-delete" v-bind="item.component" @click="$emit('on-' + item.operate)" />

        <el-upload v-else-if="item.operate === 'upload'" action="" accept="application/json" :headers="{}">
          <el-button circle size="mini" type="primary" v-bind="item.component">
            <font-awesome-icon :icon="['fas', 'upload']" />
          </el-button>
        </el-upload>

        <el-button v-else-if="item.operate === 'download'" circle size="mini" type="primary" v-bind="item.component" @click="$emit('on-' + item.operate)">
          <font-awesome-icon :icon="['fas', 'download']" />
        </el-button>

        <el-button v-else-if="item.operate === 'setting'" circle size="mini" type="primary" icon="el-icon-setting" v-bind="item.component" @click="$emit('on-' + item.operate)" />

        <component :is="item.component ? item.component.is || 'el-button' : 'el-button'" v-else circle size="mini" type="primary" icon="el-icon-plus" v-bind="item.component" @click="$emit('on-' + item.operate)" />
      </el-tooltip>
      <slot name="right-item-append" />
    </el-form-item>
  </el-form>
</template>
<script>
import { Form } from "element-ui";
import { getToken } from "@/utils/auth";
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
    rightItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      token: getToken(),
    };
  },
};
</script>
