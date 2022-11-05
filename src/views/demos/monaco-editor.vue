<template>
  <MonacoEditor v-model="code" class="editor" language="json" />
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  components: {
    MonacoEditor,
  },

  data() {
    return {
      code: "const noop = () => {}",
    };
  },
};
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
