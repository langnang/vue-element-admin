<template>
  <div>
    <InlineForm v-bind="inlineForm" :cols="inlineForm.cols" :right-item="inlineForm.rightItem" />
    <el-form v-if="false" ref="form" :model="form" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="form.title" placeholder="标题" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.description" placeholder="描述" />
      </el-form-item>
      <el-form-item style="width: 100px">
        <el-select v-model="form.type" placeholder="类别" clearable>
          <el-option value="post" label="正文" />
          <el-option value="draft" label="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item style="width: 100px">
        <el-select v-model="form.status" placeholder="状态" clearable>
          <el-option value="public" label="公共" />
          <el-option value="protected" label="保护" />
          <el-option value="private" label="私有" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSelect">查询</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 0">
        <el-tooltip effect="dark" content="强制更新" placement="bottom">
          <el-button circle size="mini" type="primary" icon="el-icon-refresh" :disabled="table.multipleSelection.length === 0" @click="handleCrawlerList" />
        </el-tooltip>
        <el-tooltip effect="dark" content="新增" placement="bottom">
          <el-button circle size="mini" type="primary" icon="el-icon-plus" @click="handleInsert" />
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="bottom">
          <el-button circle size="mini" type="danger" icon="el-icon-delete" :disabled="table.multipleSelection.length === 0" @click="handleDelete" />
        </el-tooltip>
        <el-tooltip effect="dark" content="上传" placement="bottom" style="display: inline-block; margin-left: 10px; margin-right: 10px">
          <el-upload
            :action="upload_script"
            name="script"
            accept="application/json"
            :headers="{
              Authorization: 'Bearer ' + token,
            }"
            :on-progress="
              () => {
                table.loading = true;
              }
            "
            :on-success="
              () => {
                $message.success('上传成功');
                handleSelect();
              }
            "
          >
            <el-button circle size="mini" type="primary" icon="el-icon-upload2" />
          </el-upload>
        </el-tooltip>
        <el-tooltip effect="dark" content="下载" placement="bottom">
          <el-button circle size="mini" type="primary" icon="el-icon-download" @click="handleDownload" />
        </el-tooltip>
      </el-form-item>
    </el-form>

    <el-table v-loading="table.loading" border size="mini" :data="table.data" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
      <el-table-column align="center" show-overflow-tooltip type="selection" width="45" />
      <el-table-column align="center" show-overflow-tooltip prop="title" label="标题" width="200">
        <template v-slot="{ row }">
          <el-link type="primary" :href="row.url" :underline="false" target="_blank" style="font-size: 12px">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="keywords" label="关键字" width="350" />
      <el-table-column align="center" show-overflow-tooltip prop="description" label="描述" />
      <el-table-column align="center" show-overflow-tooltip prop="order" label="排序" width="80" />
      <el-table-column align="center" show-overflow-tooltip prop="type" label="类别" width="80" />
      <el-table-column align="center" show-overflow-tooltip prop="status" label="状态" width="80" />
      <el-table-column align="center" show-overflow-tooltip prop="create_time" label="创建时间" width="140" />
      <el-table-column align="center" show-overflow-tooltip prop="update_time" label="更新时间" width="140" />
      <template v-slot:empty>
        <el-empty />
      </template>
    </el-table>

    <el-pagination v-if="table.data.length !== 0" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" :current-page="pagination.page" :page-size="pagination.size" @current-change="handleCurrentChange" @size-change="handleSizeChange" />

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" top="5vh" width="80%">
      <RowForm v-bind="dialog.form" :cols="dialog.form.cols" />
      <MonacoEditor />
      <span slot="footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { saveAs } from "file-saver";
import { insert_script, delete_script, update_script, select_script_list as select_list, upload_script, select_script_keywords } from "@/api/script";
import MonacoEditor from "@/components/MonacoEditor";
import mixin from "@/templates/PageableTableView/mixin.js";
import { originItem, inlineForm, rowForm } from "./options";
export default {
  components: {
    MonacoEditor,
  },
  mixins: [mixin],
  data() {
    return {
      upload_script,
      options: {
        type_options: [],
        status_options: [],
      },
      form: Object.assign({}, originItem),
      dialog: {
        form: Object.assign({}, rowForm),
      },
      inlineForm,
      rowForm,
    };
  },
  created() {
    this.handleSelect();
  },
  methods: {
    select_list,
    handleDownload() {
      if (this.table.multipleSelection.length === 0) {
        this.$confirm("此操作将下载所有数据, 是否继续?", "确认信息", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            return select_script_list({
              size: 9999999,
            });
          })
          .then((res) => {
            const str = new Blob([JSON.stringify(res.rows)], { type: "text/plain;charset=ytf-8" });
            saveAs(str, `script.${new Date().getTime()}.json`);
          })
          .catch(() => {
            this.$message.info("操作取消");
          });
      } else {
        this.$confirm("此操作将下载所选数据, 是否继续?", "确认信息", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const str = new Blob([JSON.stringify(this.table.multipleSelection)], { type: "text/plain;charset=ytf-8" });
            saveAs(str, `script.${new Date().getTime()}.json`);
          })
          .catch(() => {
            this.$message.info("操作取消");
          });
      }
    },
    handleCrawlerList() {
      this.table.loading = true;
      Promise.all(
        this.table.multipleSelection.map((v) => {
          return crawler_script_info({
            url: v.url,
          });
        })
      )
        .then((res) => {
          return Promise.all(
            res.map((v, i) => {
              return update_script(Object.assign({}, this.table.multipleSelection[i], v));
            })
          );
        })
        .then((res) => {
          this.$message.success("更新成功!");
          this.handleSelect();
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
    //
    handleCrawlerInfo() {
      this.dialog.loading = true;
      crawler_script_info({
        url: this.dialog.form.url,
      })
        .then((res) => {
          this.dialog.form.value = Object.assign(this.dialog.form.value, res);
        })
        .finally(() => {
          this.dialog.loading = false;
        });
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.dialog.visible = false;
      this.dialog.target = "";
      this.dialog.title = "";
      this.dialog.form.value = Object.assign({}, originItem);
    },
    handleSubmitDialog() {
      if (this.dialog.target === "insert") {
        insert_script(this.dialog.form.value).then((res) => {
          this.$message.success("新增成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
      if (this.dialog.target === "update") {
        update_script(this.dialog.form.value).then((res) => {
          this.$message.success("修改成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
    },
    handleUpdate(row) {
      this.dialog.target = "update";
      this.dialog.title = `Update ${row.title}`;
      this.dialog.form.value = Object.assign({}, originItem, row);
      this.dialog.visible = true;
    },
    handleInsert() {
      this.dialog.target = "insert";
      this.dialog.title = "New Script";
      this.dialog.form.value = Object.assign({}, originItem);
      this.dialog.visible = true;
    },
    handleSelectionChange(val) {
      this.table.multipleSelection = val;
    },
    handleSelect() {
      this.pagination.page = 1;
      this.getList();
    },
    handleReset() {
      this.form = Object.assign({}, originItem);
      this.handleSelect();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getList();
    },
    handleDelete() {
      this.$confirm("此操作将永久删除所选数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const ids = this.table.multipleSelection.map((v) => v.id);
        delete_script({
          ids,
        }).then((res) => {
          this.$message.success("删除成功!");
          this.handleSelect();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-upload-list {
  display: none;
}
</style>
