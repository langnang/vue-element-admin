<template>
  <div>
    <InlineForm v-bind="inlineForm" :cols="inlineForm.cols" :right-item="inlineForm.rightItem" @on-select="handleSelect" @on-reset="handleReset" @on-insert="handleInsert" @on-delete="handleDelete" @on-download="handleDownload" />

    <PageableTable v-loading="table.loading" v-bind="table" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate" @current-page-change="handleCurrentChange" @size-change="handleSizeChange">
      <template v-slot:title="{ row }">
        <el-link type="primary" :href="row.url" :underline="false" target="_blank" style="font-size: 12px">{{ row.title }}</el-link>
      </template>
    </PageableTable>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" top="5vh" width="80%">
      <RowForm v-bind="dialog.form" :cols="dialog.form.cols" />
      <CodeMirrorEditor ref="editor" v-model="dialog.form.value.content" theme="pastel-on-dark">
        <template v-slot:prepend="{ $options }">
          <el-select v-model="dialog.form.value.language" size="mini" filterable style="position: absolute; z-index: 99; right: 0">
            <el-option v-for="item in $options.mode_options" :key="item.name" :value="item.name" />
          </el-select>
        </template>
      </CodeMirrorEditor>
      <span slot="footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { insert_script as insert_item, delete_script as delete_list, update_script as update_item, select_script_list as select_list, upload_script as upload_list } from "@/api/script";
import CodeMirrorEditor from "@/components/CodeMirrorEditor";
import mixin from "@/templates/PageableTableView/mixin.js";
import { originItem, inlineForm, pageableTable, rowForm } from "./options";
import PageableTable from "../../templates/PageableTableView/components/PageableTable.vue";
export default {
  components: {
    CodeMirrorEditor,
    PageableTable,
  },
  mixins: [mixin],
  data() {
    return {
      originItem,
      upload_list,
      options: {
        type_options: [],
        status_options: [],
      },
      form: Object.assign({}, originItem),
      dialog: {
        form: Object.assign({}, rowForm),
      },
      inlineForm,
      table: pageableTable,
      rowForm,
    };
  },
  created() {
    this.handleSelect();
  },
  methods: {
    insert_item,
    delete_list,
    update_item,
    select_list,
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-upload-list {
  display: none;
}
</style>
