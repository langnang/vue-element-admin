<template>
  <el-row>
    <el-col :span="8">
      <CodeMirrorEditorController @theme-change="(theme) => (configuration.theme = theme)" />
    </el-col>
    <el-col :span="16">
      <CodeMirrorEditor v-bind="configuration" />
    </el-col>
  </el-row>
</template>
<script>
import CodeMirrorEditor from "@/components/CodeMirrorEditor";
import CodeMirrorEditorController from "@/components/CodeMirrorEditor/controller";
export default {
  components: { CodeMirrorEditor, CodeMirrorEditorController },
  data() {
    return {
      configuration: {
        value: "",
        theme: "",
        mode: "",
      },
    };
  },
  methods: {},
};
</script>
