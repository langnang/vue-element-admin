/** * @name 网址管理 */
<template>
  <div>
    <el-form ref="form" :model="form" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="form.url" placeholder="地址" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.keywords" placeholder="关键字" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.description" placeholder="描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSelect">查询</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 0">
        <el-button type="primary" circle icon="el-icon-plus" @click="handleInsert" />
        <el-button type="warning" circle icon="el-icon-edit" :disabled="table.multipleSelection.length !== 1" @click="handleUpdate" />
        <el-button type="danger" circle icon="el-icon-delete" :disabled="table.multipleSelection.length === 0" @click="handleDelete" />
      </el-form-item>
    </el-form>

    <el-table v-loading="table.loading" border :data="table.data" @selection-change="handleSelectionChange">
      <el-table-column align="center" show-overflow-tooltip type="selection" width="45" />
      <el-table-column align="center" show-overflow-tooltip prop="title" label="标题" width="200" />
      <el-table-column align="center" show-overflow-tooltip prop="keywords" label="关键字" width="350" />
      <el-table-column align="center" show-overflow-tooltip prop="description" label="描述" />
    </el-table>

    <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" :current-page="pagination.page" :page-size="pagination.size" @current-change="handleCurrentChange" @size-change="handleSizeChange" />

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form ref="dialog" v-loading="dialog.loading" :model="dialog.data" label-width="80px">
        <el-form-item label="地址">
          <el-input v-model="dialog.form.url" placeholder="地址">
            <el-button slot="append" icon="el-icon-refresh" @click="handleCrawlerInfo" />
          </el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="dialog.form.keywords" placeholder="关键字" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dialog.form.description" type="textarea" placeholder="描述" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { crawler_website_info, insert_website, delete_website, update_website, select_website_list } from "@/api/website";
const originItem = {
  url: "",
  keywords: "",
  description: "",
};
export default {
  data() {
    return {
      form: Object.assign({}, originItem),
      table: {
        loading: false,
        border: true,
        size: "small",
        cols: [
          {
            label: "标题",
            prop: "title",
            align: "center",
            "show-overflow-tooltip": true,
          },
          {
            label: "关键字",
            prop: "keywords",
            align: "center",
            "show-overflow-tooltip": true,
          },
          {
            label: "描述",
            prop: "description",
            align: "center",
            "show-overflow-tooltip": true,
          },
          {
            isSlot: true,
            prop: "action",
            label: "操作",
            align: "center",
            width: 120,
          },
        ],
        data: [],
        multipleSelection: [],
      },
      pagination: {
        page: 1,
        size: 10,
        total: 400,
      },
      dialog: {
        target: "", //insert update
        loading: false,
        visible: false,
        title: "",
        form: Object.assign({}, originItem),
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //
    handleCrawlerInfo() {
      this.dialog.loading = true;
      crawler_website_info({
        url: this.dialog.form.url,
      })
        .then((res) => {
          console.log(res);
          this.dialog.form = Object.assign(this.dialog.form, res);
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
      this.dialog.form = Object.assign({}, originItem);
    },
    handleSubmitDialog() {
      if (this.dialog.target === "insert") {
        insert_website(this.dialog.form).then((res) => {
          this.$message.success("新增成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
      if (this.dialog.target === "update") {
        update_website(this.dialog.form).then((res) => {
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
      this.dialog.visible = true;
    },
    handleInsert() {
      this.dialog.target = "insert";
      this.dialog.title = "New Website";
      this.dialog.form = Object.assign({}, originItem);
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
      this.getList();
    },
    getList() {
      this.table.loading = true;
      select_website_list({
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
        delete_website({
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
