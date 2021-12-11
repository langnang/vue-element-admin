<template>
  <div>
    <el-form ref="form" :model="form" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="form.title" placeholder="标题" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.domains" placeholder="域名" clearable />
      </el-form-item>
      <el-form-item style="width: 100px">
        <el-select v-model="form.type" placeholder="类别" clearable>
          <el-option v-for="(v, k) in options.type_options" :key="k" :value="k" :label="v" />
        </el-select>
      </el-form-item>
      <el-form-item style="width: 100px">
        <el-select v-model="form.status" placeholder="状态" clearable>
          <el-option v-for="(v, k) in options.status_options" :key="k" :value="k" :label="v" />
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
        <el-tooltip effect="dark" content="启动" placement="bottom">
          <el-button circle size="mini" type="primary" icon="el-icon-video-play" :disabled="table.multipleSelection.length === 0" @click="handleUpdateParams({ status: 'queue' })" />
        </el-tooltip>
        <el-tooltip effect="dark" content="停止" placement="bottom">
          <el-button circle size="mini" type="primary" icon="el-icon-video-pause" :disabled="table.multipleSelection.length === 0" @click="handleUpdateParams({ status: 'stop' })" />
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

    <el-table v-loading="table.loading" border size="mini" :data="table.data" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
      <el-table-column align="center" show-overflow-tooltip type="selection" width="45" />
      <el-table-column align="center" show-overflow-tooltip prop="title" label="标题" width="160" />
      <el-table-column align="center" show-overflow-tooltip prop="domains" label="域名" width="200" />
      <el-table-column align="center" show-overflow-tooltip prop="content_url_regexes" label="内容页URL规则" />
      <el-table-column align="center" show-overflow-tooltip prop="order" label="排序" width="60" />
      <el-table-column align="center" show-overflow-tooltip prop="type" label="类别" width="60">
        <template v-slot="{ row }">
          {{ row.type ? options.type_options[row.type] : "" }}
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="status" label="状态" width="60">
        <template v-slot="{ row }">
          {{ row.status ? options.status_options[row.status] : "" }}
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="content_count" label="抽取数" width="70">
        <template v-slot="{ row }">
          <el-link type="primary" :underline="false" style="font-size: 12px" @click="handleSelectContentList(row)">{{ row.content_count }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="create_time" label="创建时间" width="140" />
      <el-table-column align="center" show-overflow-tooltip prop="update_time" label="更新时间" width="140" />
      <template v-slot:empty>
        <el-empty />
      </template>
    </el-table>

    <el-pagination v-if="table.data.length !== 0" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" :current-page="pagination.page" :page-size="pagination.size" @current-change="handleCurrentChange" @size-change="handleSizeChange" />

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="80%" top="8vh">
      <el-form ref="dialog" :model="dialog.data" label-width="120px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="dialog.form.title">
            <el-select slot="append" v-model="dialog.form.type" style="width: 80px">
              <el-option v-for="(v, k) in options.type_options" :key="k" :value="k" :label="v" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="domains" label="域名">
          <el-tag v-for="(url, index) in dialog.form.domains" :key="url" closable :disable-transitions="false" @close="handleCloseTag('domains', index)">
            {{ url }}
          </el-tag>
          <el-input v-if="dialog.tagInput.domains.visible" v-model="dialog.tagInput.domains.value" size="mini" style="width: auto" @keyup.enter.native="handleTagInputConfirm('domains')" @blur="handleTagInputConfirm('domains')" />
          <el-button v-else size="mini" @click="dialog.tagInput.domains.visible = true">+ New</el-button>
        </el-form-item>
        <el-form-item prop="scan_urls" label="入口链接">
          <el-tag v-for="(url, index) in dialog.form.scan_urls" :key="url" closable :disable-transitions="false" @close="handleCloseTag('scan_urls', index)">
            {{ url }}
          </el-tag>
          <el-input v-if="dialog.tagInput.scan_urls.visible" v-model="dialog.tagInput.scan_urls.value" size="mini" style="width: auto" @keyup.enter.native="handleTagInputConfirm('scan_urls')" @blur="handleTagInputConfirm('scan_urls')" />
          <el-button v-else size="mini" @click="dialog.tagInput.scan_urls.visible = true">+ New</el-button>
        </el-form-item>
        <el-form-item prop="list_url_regexes" label="列表页URL规则">
          <el-tag v-for="(url, index) in dialog.form.list_url_regexes" :key="url" closable :disable-transitions="false" @close="handleCloseTag('list_url_regexes', index)">
            {{ url }}
          </el-tag>
          <el-input v-if="dialog.tagInput.list_url_regexes.visible" v-model="dialog.tagInput.list_url_regexes.value" size="mini" style="width: auto" @keyup.enter.native="handleTagInputConfirm('list_url_regexes')" @blur="handleTagInputConfirm('list_url_regexes')" />
          <el-button v-else size="mini" @click="dialog.tagInput.list_url_regexes.visible = true">+ New</el-button>
        </el-form-item>
        <el-form-item prop="content_url_regexes" label="内容页URL规则">
          <el-tag v-for="(url, index) in dialog.form.content_url_regexes" :key="url" closable :disable-transitions="false" @close="handleCloseTag('content_url_regexes', index)">
            {{ url }}
          </el-tag>
          <el-input v-if="dialog.tagInput.content_url_regexes.visible" v-model="dialog.tagInput.content_url_regexes.value" size="mini" style="width: auto" @keyup.enter.native="handleTagInputConfirm('content_url_regexes')" @blur="handleTagInputConfirm('content_url_regexes')" />
          <el-button v-else size="mini" @click="dialog.tagInput.content_url_regexes.visible = true">+ New</el-button>
        </el-form-item>
        <el-form-item prop="fields" label-width="0px">
          <el-table
            :data="dialog.form.fields"
            style="width: 100%"
            size="mini"
            border
            resizable
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :row-key="
              (row) => {
                return Math.random();
              }
            "
          >
            <el-table-column prop="name" label="列名" width="200">
              <template v-slot="{ row }">
                <el-input v-model="row.name" size="mini" type="text" style="width: auto; position: absolute; top: 6px; margin-right: 10px" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="description" label="描述" width="160">
              <template v-slot="{ row }">
                <el-input v-model="row.description" size="mini" type="text" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="selector" label="元素选择器">
              <template v-slot="{ row }">
                <el-input v-model="row.selector" size="mini" type="text" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="required" label="必要" width="65">
              <template v-slot="{ row }">
                <el-switch v-model="row.required" size="mini" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="repeated" label="多项" width="65">
              <template v-slot="{ row }">
                <el-switch v-model="row.repeated" size="mini" />
              </template>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="操作" width="120">
              <template slot="header">
                <el-button type="primary" size="mini" round icon="el-icon-plus" @click="dialog.form.fields.push({ id: Math.random() })" />
              </template>
              <template v-slot="scope">
                <el-button size="mini" type="text" icon="el-icon-circle-plus-outline" @click="handlePushFieldChildrenRow(scope)" />
                <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDeleteFieldRow(scope)" />
                <el-button size="mini" type="text" icon="el-icon-copy-document" @click="handleCopyFieldRow(scope)" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <PhpSpiderContentTable v-loading="dialog.table.loading" :data="dialog.table.data" :cols="dialog.table.cols" />
      <span slot="footer">
        <el-button type="warning" style="float: left" @click="handleTest">测 试</el-button>
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="content_dialog.visible" width="80%" top="5vh">
      <PhpSpiderContentTable :data="content_table.data" :cols="content_table.cols" />
    </el-dialog>
  </div>
</template>
<script>
import { saveAs } from "file-saver";
import { select_phpspider_options, test_phpspider, insert_phpspider, delete_phpspider, update_phpspider, select_phpspider_list, select_phpspider_content_list, upload_phpspider } from "@/api/phpspider";
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
import mixin from "@/templates/PageableTableView/mixin.js";
import PhpSpiderContentTable from "./components/ContentTable";

export default {
  components: { PhpSpiderContentTable },
  mixins: [mixin],
  data() {
    return {
      upload_phpspider,
      options: {
        type_options: [],
        status_options: [],
      },
      form: Object.assign({}, originItem, { fields: [] }),
      dialog: {
        target: "", //insert update
        loading: false,
        visible: false,
        title: "",
        form: Object.assign({}, originItem, { fields: [] }),
        tagInput: {
          domains: { visible: false, value: "" },
          scan_urls: { visible: false, value: "" },
          list_url_regexes: { visible: false, value: "" },
          content_url_regexes: { visible: false, value: "" },
        },
        table: {
          loading: false,
          data: [],
          cols: [],
        },
      },
      content_table: Object.assign({}, this.table),
      content_dialog: { visible: false },
    };
  },
  created() {
    this.table.loading = true;
    select_phpspider_options().then((res) => {
      this.options = res;
      this.handleSelect();
    });
  },
  methods: {
    handleSelectContentList(row) {
      select_phpspider_content_list({
        phpspider: parseInt(row.id),
      }).then((res) => {
        this.content_table.data = res.rows;
        this.content_table.cols = row.fields;
        this.content_dialog.visible = true;
      });
    },
    handleCloseTag(param, $index) {
      this.dialog.form[param].splice($index, 1);
    },
    handleTagInputConfirm(param) {
      let value = this.dialog.tagInput[param].value;
      if (value) {
        if (!this.dialog.form[param]) {
          this.dialog.form[param] = [];
        }
        this.dialog.form[param].push(value);
      }
      this.dialog.tagInput[param].visible = false;
      this.dialog.tagInput[param].value = "";
    },
    // 新增字段规则子项
    handlePushFieldChildrenRow({ row, column, $index }, obj = this.dialog.form.fields, currentIndex = 0) {
      if (currentIndex === undefined) return;
      for (let i = 0; i <= obj.length - 1; i++) {
        if (currentIndex === $index) {
          const new_item = {};
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
        ...{},
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
      this.dialog.table.loading = true;
      this.dialog.table.cols = JSON.parse(JSON.stringify(this.dialog.form.fields));
      test_phpspider(this.dialog.form)
        .then((res) => {
          this.dialog.table.data = res;
        })
        .finally(() => {
          this.dialog.table.loading = false;
        });
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.dialog.visible = false;
      this.dialog.target = "";
      this.dialog.title = "";
      this.dialog.form = Object.assign({}, originItem, { fields: [] });
      this.dialog.table.data = [];
      this.dialog.table.cols = [];
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
    handleUpdate(row) {
      this.dialog.target = "update";
      this.dialog.title = `Update ${row.title}`;
      this.dialog.form = Object.assign({}, originItem, row);
      if (this.dialog.form.fields === null) {
        this.dialog.form.fields = [];
      }
      this.dialog.table.data = [];
      this.dialog.table.cols = [];
      this.dialog.visible = true;
    },
    handleUpdateParams(data) {
      this.table.loading = true;
      Promise.all(
        this.table.multipleSelection.map((v) => {
          return update_phpspider(Object.assign({}, v, data));
        })
      )
        .then((res) => {
          this.$message.success("更新成功!");
          this.handleSelect();
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
    handleInsert() {
      this.dialog.target = "insert";
      this.dialog.title = "New PhpSider";
      this.dialog.form = Object.assign({}, originItem, { fields: [] });
      this.dialog.table.data = [];
      this.dialog.table.cols = [];
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
::v-deep .el-dialog__wrapper .el-tag {
  margin-right: 8px;
}
</style>
