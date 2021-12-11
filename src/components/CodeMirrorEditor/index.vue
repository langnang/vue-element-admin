<template>
  <textarea ref="editor" />
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
require("script-loader!jsonlint");
import "codemirror/addon/lint/lint";
// import "codemirror/addon/lint/json-lint";

export default {
  name: "CodeMirrorEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value(value) {
      const editorValue = this.editor.getValue();
      if (value !== editorValue) {
        this.editor.setValue(JSON.stringify(this.value, null, 2));
      }
    },
    theme: {
      handler(value) {
        require(`codemirror/theme/${value}.css`);
        this.editor.setOption("theme", value);
      },
    },
    mode: {
      handler(value) {
        require(`codemirror/mode/${value}/${value}`);
        this.editor.setOption("mode", value);
      },
    },
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
      lineNumbers: true,
      // mode: "application/json",
      // gutters: ["CodeMirror-lint-markers"],
      // theme: "idea",
      theme: this.theme,
      mode: this.mode,
      lint: true,
    });

    this.editor.setValue(JSON.stringify(this.value, null, 2));
    this.editor.on("change", (cm) => {
      this.$emit("changed", cm.getValue());
      this.$emit("input", cm.getValue());
    });
  },
  methods: {
    getValue() {
      return this.editor.getValue();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .CodeMirror {
    height: auto;
    min-height: 200px;
  }

  .CodeMirror-scroll {
    min-height: 200px;
  }

  .cm-s-rubyblue span.cm-string {
    color: #f08047;
  }
}
</style>
