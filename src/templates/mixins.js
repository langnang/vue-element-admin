/**
 * 通用 Mixin
 */
const formMixin = {
  data() {
    return {};
  },
  methods: {
    handleFormReset() {},
    handleBeforeFormSubmit() {},
    handleFormSubmit() {},
  },
};
const tableMixin = {};

const elTableMethods = {};
const elPaginationMethods = {};

export default {
  data() {
    return {
      loading: false,
      form: {
        loading: false,
        data: {},
        items: [],
        rules: {},
        bind: {
          labelWidth: "80px",
          style: {
            marginRight: "20px",
          },
        },
        // 数据主键
        primary_keys: [],
        upload: {
          action: "",
          "show-file-list": false,
        },
      },
      info: {},
      list: {
        loading: false,
        data: [],
        total: 0,
        page: 1,
        size: 20,
        row: null,
        selection: [],
        columns: [],
        bind: {},
      },
      dialog: {
        visible: false,
        title: "",
        data: [],
        bind: {},
      },
      // 切换路由
      to: {
        insertItem: () => ({
          path: this.$route.path.split("/").slice(0, -1).join("/") + "/info",
        }),
        insertList: () => ({}),
        deleteItem: () => ({}),
        deleteList: () => ({}),
        updateItem: () => ({
          path: this.$route.path.split("/").slice(0, -1).join("/") + "/info",
          query: this.form.primary_keys.reduce((t, key) => {
            t[key] = (this.list.row || this.list.selection[0])[key];
            return t;
          }, {}),
        }),
        updateList: () => ({}),
        selectItem: () => ({
          path: this.$route.path.split("/").slice(0, -1).join("/") + "/info",
          query: this.form.primary_keys.reduce((t, key) => {
            t[key] = (this.list.row || this.list.selection[0])[key];
            return t;
          }, {}),
        }),
        selectList: () => ({}),
        selectTree: () => ({}),
        selectCount: () => ({}),
      },
    };
  },
  methods: {
    // router
    ...{
      handleGo(operate) {
        if (this.dialog.data.length > 0) {
          if (operate === "insertItem") {
            this.dialog.title = "选择新增类型";
            this.dialog.visible = true;
            return;
          }
        }

        this.$router.push(this.to[operate]());
      },
      handleBack() {},
    },

    // button
    handleClick() {},
    // form
    handleQuery() {
      this.list.page = 1;
      this.handleOperateSelectList();
    },
    // from
    ...{
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleBeforeSubmit() {
        return true;
      },
      handleSubmit(name) {
        if (!this.handleBeforeSubmit()) return;

        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log("🚀 ~ file: index.js ~ line 52 ~ this.$refs[name].validate ~ submit");
          } else {
            return false;
          }
        });
      },
    },

    // upload
    handleUploadPreview() {},
    handleUploadRemove() {},
    handleUploadExceed() {},
    handleUploadSuccess() {},
    handleUploadHttpRequest(data) {
      console.log("🚀 ~ file: upload.vue ~ line 32 ~ handleUploadHttpRequest ~ handleUploadHttpRequest", data);
      const fileData = new FormData();
      fileData.append("name", data.file);
      request({ url: data.action, method: "post", data: fileData });
    },
    // table
    // 当某个单元格被点击时会触发该事件
    handleTableCellClick() {},
    // 当某个单元格被双击击时会触发该事件
    handleTableCellDblClick() {},
    // 当某一行被点击时会触发该事件
    handleTableRowClick(row, column, event) {
      this.list.row = row;
      this.handleGo("updateItem");
    },
    // 当某一行被双击时会触发该事件
    handleTableRowDblClick(row, column, event) {},
    //  当某一行被鼠标右键点击时会触发该事件
    handleTableRowContextMenu(row, column, event) {
      // event.preventDefault()
      // 右键表格行，显示菜单
      this.list.row = row;
      // this.$refs.contextmenu.show({ top: event.clientY, left: event.clientX });
    },
    // 当选择项发生变化时会触发该事件
    handleTableSelectionChange(val) {
      this.list.selection = val;
    },
    //

    // pagination
    // pageSize 改变时会触发
    handlePaginationSizeChange(pageSize) {
      this.list.size = pageSize;
      this.handleOperateSelectList();
    },
    // currentPage 改变时会触发
    handlePaginationCurrentChange(currentPage) {
      this.list.page = currentPage;
      this.handleOperateSelectList();
    },
    // 用户点击上一页按钮改变当前页后触发
    handlePaginationPrevClick(page) {},
    // 用户点击下一页按钮改变当前页后触发
    handlePaginationNextClick(page) {},
    // mouse
    /**
     * 隐藏菜单
     */
    handleMouseDown() {
      this.list.row = null;
      // this.$refs.contextmenu.hide()
    },
    // actions
    getFormData(operate) {
      return this.form.data;
    },
    handleOperateInsertItem(data = {}, showMsg = true) {
      this.form.loading = true;
      return this.requestInsertItem({
        ...this.getFormData("insertItem"),
        ...data,
      })
        .then((res) => {
          this.$message.success(`新增成功`);
          return Promise.resolve(res);
        })
        .finally(() => {
          this.form.loading = false;
        });
    },
    handleOperateImportItem() {},
    handleOperateDeleteItem() {},
    handleOperateDeleteList(data = {}, showMsg = true) {
      console.log("🚀 ~ file: index.js ~ line 165 ~ handleOperateDeleteList ~ data", data);
      return this.$confirm("此操作将永久删除所选内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.list.loading = true;
        console.log("🚀 ~ file: index.js ~ line 172 ~ handleOperateDeleteList ~ this.list.selection", this.list.selection);
        console.log("🚀 ~ file: index.js ~ line 173 ~ handleOperateDeleteList ~ this.list.row", this.list.row);
        data = {
          ...data,
          ...this.form.primary_keys.reduce((t, key) => {
            t[key] = [...this.list.selection, this.list.row || {}].map((v) => v[key]).filter((v) => v);
            return t;
          }, {}),
        };
        console.log("🚀 ~ file: index.js ~ line 172 ~ handleOperateDeleteList ~ data", data);
        return this.requestDeleteList(data)
          .then((res) => {
            this.$message.success(`删除成功`);
            return this.handleOperateSelectList();
          })
          .finally(() => {
            this.list.loading = false;
          });
      });
    },
    handleOperateUpdateItem(data = {}, showMsg = true) {
      this.form.loading = true;
      return this.requestUpdateItem({
        ...this.getFormData("updateItem"),
        ...data,
      })
        .then((res) => {
          this.$message.success(`修改成功`);
          return Promise.resolve(res);
        })
        .finally(() => {
          this.form.loading = false;
        });
    },
    handleOperateSelectList(data = {}, showMsg = true) {
      this.list.loading = true;
      return this.requestSelectList({
        ...this.getFormData("selectList"),
        page: this.list.page,
        size: this.list.size,
        ...data,
      })
        .then((res) => {
          this.list.data = res.rows;
          this.list.total = res.total;
          this.list.page = res.page;
          this.list.size = res.size;
          return Promise.resolve(res);
        })
        .finally(() => {
          this.list.loading = false;
        });
    },
    handleOperateSelectTree() {},
    handleOperateSelectItem(data, showMsg = true) {
      this.form.loading = true;
      return this.requestSelectItem({
        ...this.getFormData("selectItem"),
        ...data,
      })
        .then((res) => {
          this.info = { ...res };
          this.form.data = { ...res };
          return Promise.resolve(res);
        })
        .finally(() => {
          this.form.loading = false;
        });
    },
    handleOperateSelectCount(data, showMsg = true) {
      this.loading = true;
      this.requestSelectCount(data).finally(() => {
        this.loading = true;
      });
    },
    handleOperateExportList() {},

    // apis
    requestInsertItem() {
      return Promise.resolve({});
    },
    requestImportItem() {},
    requestDeleteItem() {
      return Promise.resolve({});
    },
    requestDeleteList() {
      return Promise.resolve({});
    },
    requestUpdateItem() {
      return Promise.resolve({});
    },
    requestSelectItem() {
      return Promise.resolve({});
    },
    requestSelectList() {
      return Promise.resolve({ rows: [], total: 0, page: 1, size: 20 });
    },
    requestSelectTree() {
      return Promise.resolve({ rows: [], tree: [], total: 0, page: 1, size: 20 });
    },
    requestSelectCount() {
      return Promise.resolve({ rows: [], count_total: 0, total: 0 });
    },
    requestExportList() {},
  },
};
