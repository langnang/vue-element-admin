<template>
  <div>
    <el-form ref="form" :model="form" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="form.title" placeholder="标题" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.domains" placeholder="域名" />
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
        <el-tooltip effect="dark" content="新增" placement="bottom">
          <el-button circle size="mini" type="primary" icon="el-icon-plus" @click="handleInsert" />
        </el-tooltip>
        <el-tooltip effect="dark" content="编辑" placement="bottom">
          <el-button circle size="mini" type="warning" icon="el-icon-edit" :disabled="table.multipleSelection.length !== 1" @click="handleUpdate" />
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="bottom">
          <el-button circle size="mini" type="danger" icon="el-icon-delete" :disabled="table.multipleSelection.length === 0" @click="handleDelete" />
        </el-tooltip>
        <el-tooltip effect="dark" content="上传" placement="bottom" style="display: inline-block; margin-left: 10px; margin-right: 10px">
          <el-upload
            :action="upload_phpspider"
            name="phpspider"
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

    <el-table v-loading="table.loading" border size="mini" :data="table.data" @selection-change="handleSelectionChange">
      <el-table-column align="center" show-overflow-tooltip type="selection" width="45" />
      <el-table-column align="center" show-overflow-tooltip prop="title" label="标题" width="160" />
      <el-table-column align="center" show-overflow-tooltip prop="domains" label="域名" width="350" />
      <el-table-column align="center" show-overflow-tooltip prop="content_url_regexes" label="内容页URL规则" />
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

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="80%">
      <el-form ref="dialog" v-loading="dialog.loading" :model="dialog.data" label-width="120px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="dialog.form.title" />
        </el-form-item>
        <el-form-item prop="domains" label="域名">
          <el-select v-model="dialog.form.domains" clearable multiple filterable allow-create />
        </el-form-item>
        <el-form-item prop="scan_urls" label="入口链接">
          <el-select v-model="dialog.form.scan_urls" clearable multiple filterable allow-create />
        </el-form-item>
        <el-form-item prop="list_url_regexes" label="列表页URL规则">
          <el-select v-model="dialog.form.list_url_regexes" clearable multiple filterable allow-create />
        </el-form-item>
        <el-form-item prop="content_url_regexes" label="内容页URL规则">
          <el-select v-model="dialog.form.content_url_regexes" clearable multiple filterable allow-create />
        </el-form-item>
        <el-form-item label="抽取规则" />
        <el-form-item prop="fields" label-width="0px">
          <el-table :data="dialog.form.fields" style="width: 100%" size="mini" border resizable :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="name" default-expand-all>
            <el-table-column prop="name" label="列名" width="200">
              <template v-slot="{ row }">
                <el-input v-model="row.name" type="text" style="width: auto; position: absolute; top: 6px; margin-right: 10px" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="description" label="描述" width="160">
              <template v-slot="{ row }">
                <el-input v-model="row.description" type="text" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="selector" label="元素选择器">
              <template v-slot="{ row }">
                <el-input v-model="row.selector" type="text" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="required" label="必要" width="65">
              <template v-slot="{ row }">
                <el-switch v-model="row.required" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="repeated" label="多项" width="65">
              <template v-slot="{ row }">
                <el-switch v-model="row.repeated" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="操作" width="120">
              <template slot="header">
                <el-button type="primary" size="mini" round icon="el-icon-plus" @click="dialog.form.fields.push({})" />
              </template>
              <template v-slot="scope">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="handlePushFieldChildrenRow(scope)" />
                <el-button type="text" icon="el-icon-delete" @click="handleDeleteFieldRow(scope)" />
                <el-button type="text" icon="el-icon-copy-document" @click="handleCopyFieldRow(scope)" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="warning" style="float: left" @click="handleTest">测 试</el-button>
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { saveAs } from "file-saver";
import { test_phpspider, insert_phpspider, delete_phpspider, update_phpspider, select_phpspider_list, upload_phpspider, select_phpspider_keywords } from "@/api/phpspider";
const originItem = {
  title: null,
  domains: null,
  scan_urls: null,
  list_url_regexes: null,
  content_url_regexes: null,
  fields: null,
  status: null,
  type: null,
};
const typeOptions = {};
const statusOptions = {};
export default {
  data() {
    return {
      token: getToken(),
      upload_phpspider,
      form: Object.assign({}, originItem, { fields: [] }),
      keywordOptions: [],
      table: {
        loading: false,
        data: [],
        multipleSelection: [],
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      dialog: {
        target: "", //insert update
        loading: false,
        visible: false,
        title: "",
        form: Object.assign({}, originItem, { fields: [] }),
      },
    };
  },
  created() {
    this.handleSelect();
  },
  methods: {
    // 新增字段规则子项
    handlePushFieldChildrenRow({ row, column, $index }, obj = this.dialog.form.fields, currentIndex = 0) {
      if (currentIndex === undefined) return;
      for (let i = 0; i <= obj.length - 1; i++) {
        if (currentIndex === $index) {
          const new_item = { name: new Date().valueOf() };
          obj[i].children ? obj[i].children.push(new_item) : (obj[i].children = [new_item]);
          this.$set(this.dialog.form, "fields", [...this.dialog.form.fields]);
          return;
        } else {
          currentIndex = obj[i].children ? this.handlePushFieldChildrenRow({ row, column, $index }, obj[i].children, currentIndex + 1) : currentIndex + 1;
        }
      }
      return currentIndex;
    },
    handleCopyFieldRow({ row, column, $index }) {
      this.dialog.form.fields.splice($index + 1, 0, {
        ...this.dialog.form.fields[$index],
        ...{ name: new Date().valueOf() },
      });
    },
    handleDeleteFieldRow({ row, column, $index }) {
      this.dialog.form.fields.splice($index, 1);
    },
    handleDownload() {
      if (this.table.multipleSelection.length === 0) {
        this.$confirm("此操作将下载所有数据, 是否继续?", "确认信息", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            return select_phpspider_list({
              size: 9999999,
            });
          })
          .then((res) => {
            const str = new Blob([JSON.stringify(res.rows)], { type: "text/plain;charset=ytf-8" });
            saveAs(str, `phpspider.${new Date().getTime()}.json`);
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
            saveAs(str, `phpspider.${new Date().getTime()}.json`);
          })
          .catch(() => {
            this.$message.info("操作取消");
          });
      }
    },
    //
    handleTest() {
      this.dialog.loading = true;
      test_phpspider(this.dialog.form)
        .then((res) => {
          var_dump(res);
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
      this.dialog.form = Object.assign({}, originItem, { fields: [] });
    },
    handleSubmitDialog() {
      if (this.dialog.target === "insert") {
        insert_phpspider(this.dialog.form).then((res) => {
          this.$message.success("新增成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
      if (this.dialog.target === "update") {
        update_phpspider(this.dialog.form).then((res) => {
          this.$message.success("修改成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
    },
    handleUpdate() {
      this.dialog.target = "update";
      this.dialog.title = `Update ${this.table.multipleSelection[0].title}`;
      this.dialog.form = Object.assign({}, originItem, this.table.multipleSelection[0]);
      if (this.dialog.form.fields === null) {
        this.dialog.form.fields = [];
      }
      this.dialog.visible = true;
      console.log(this.dialog.form);
    },
    handleInsert() {
      this.dialog.target = "insert";
      this.dialog.title = "New PhpSider";
      this.dialog.form = Object.assign({}, originItem, { fields: [] });
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
      this.form = Object.assign({}, originItem, { fields: [] });
      this.handleSelect();
    },
    getList() {
      this.table.loading = true;
      select_phpspider_list({
        ...this.form,
        ...this.pagination,
      })
        .then((res) => {
          this.table.data = res.rows;
          this.pagination.total = res.total;
          this.pagination.page = res.page;
          this.pagination.size = res.size;
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
    getKeywordList(str) {
      if (str === "") {
        this.keywordOptions = [];
        return;
      }
      select_phpspider_keywords(str).then((res) => {
        this.keywordOptions = res.rows;
      });
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
        delete_phpspider({
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
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-dialog__wrapper .el-table__header-wrapper th {
  text-align: center;
}
</style>
