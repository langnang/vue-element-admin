import InlineForm from './components/InlineForm'
import PageableTable from './components/PageableTable'
import RowForm from './components/RowForm'
import { getToken } from "@/utils/auth";
import { saveAs } from "file-saver";

export default {
  name: "PageableDataTable",
  components: { InlineForm, PageableTable, RowForm },
  data() {
    return {
      token: getToken(),
      api_path: 'index',
      form: {},
      table: {
        loading: false,
        data: [],
        multipleSelection: [],
        pagination: {
          page: 1,
          size: 10,
          total: 0,
        },
      },
      dialog: {
        target: "",
        title: "",
        visible: false,
        target: "", //insert update
        form: {},
      },
    };
  },
  methods: {
    handleSelect() {
      this.table.pagination.page = 1;
      this.getList();
    },
    handleReset() {
      this.form = Object.assign({}, this.originItem);
      this.handleSelect();
    },
    handleDelete() {
      this.$confirm("此操作将永久删除所选数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const ids = this.table.multipleSelection.map((v) => v.id);
        this.delete_list({
          ids,
        }).then((res) => {
          this.$message.success("删除成功!");
          this.handleSelect();
        });
      });
    },
    handleUpdate(row) {
      this.dialog.target = "update";
      this.dialog.title = `Update ${row.title}`;
      this.dialog.form.value = Object.assign({}, this.originItem, row);
      this.dialog.visible = true;
    },
    handleInsert() {
      this.dialog.target = "insert";
      this.dialog.title = "New Script";
      this.dialog.form.value = Object.assign({}, this.originItem);
      this.dialog.visible = true;
    },
    handleDownload() {
      if (this.table.multipleSelection.length === 0) {
        this.$confirm("此操作将下载所有数据, 是否继续?", "确认信息", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            return this.select_list({
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
    getList() {
      this.table.loading = true;
      this.select_list({
        ...this.form,
        ...this.table.pagination,
      })
        .then((res) => {
          this.table.data = res.rows;
          this.table.pagination.total = res.total;
          this.table.pagination.page = res.page;
          this.table.pagination.size = res.size;
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
    handleSelectionChange(val) {
      this.table.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.table.pagination.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.table.pagination.size = val;
      this.getList();
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.dialog.visible = false;
      this.dialog.target = "";
      this.dialog.title = "";
      this.dialog.form.value = Object.assign({}, this.originItem);
    },
    handleSubmitDialog() {
      if (this.dialog.target === "insert") {
        this.insert_item(this.dialog.form.value).then((res) => {
          this.$message.success("新增成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
      if (this.dialog.target === "update") {
        this.update_item(this.dialog.form.value).then((res) => {
          this.$message.success("修改成功");
          this.handleCloseDialog();
          this.handleSelect();
        });
        return;
      }
    },
  }
};
