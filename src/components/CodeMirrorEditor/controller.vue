<template>
  <el-form ref="form" size="mini" label-width="80px" label-position="left">
    <el-form-item label="theme">
      <el-select v-model="form.theme" filterable>
        <el-option v-for="item in options.theme_options" :key="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="mode">
      <el-select v-model="form.mode" filterable>
        <el-option v-for="item in options.mode_options" :key="item.name" :value="item.name" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import { theme_options, mode_options } from "./options";
export default {
  name: "CodeMirrorEditorController",
  data() {
    return {
      options: {
        theme_options,
        mode_options,
      },
      form: {
        theme: "",
        mode: "",
      },
    };
  },
  watch: {
    "form.theme": {
      handler(value) {
        this.$emit("theme-change", value);
      },
    },
    "form.mode": {
      handler(value) {
        this.$emit("mode-change", value);
      },
    },
  },
};
</script>
