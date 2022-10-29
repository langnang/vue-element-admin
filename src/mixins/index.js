/**
 * 通用 Mixin
 */
export default {
  data() {
    return {
      loading: false,
      form: {
        loading: false,
        data: {},
        items: [],
        rules: {},
        bind: {},
        // 数据主键
        key: "",
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
        insertItem: {},
        insertList: {},
        deleteItem: {},
        deleteList: {},
        updateItem: {},
        updateList: {},
        selectItem: () => ({
          path: this.$route.path.split("/").slice(0, -1).join("/") + "/info",
          query: { [this.form.key]: this.list.selection[0][this.form.key] },
        }),
        selectList: {
          query: () => {},
        },
        selectTree: {},
        selectCount: {},
      },
    };
  },
  methods: {
    handleGo(operate) {
      this.$router.push(this.to[operate]());
    },
    handleBack() {},
    // button
    handleClick() {},
    // form
    handleQuery() {
      this.list.page = 1;
      this.handleSelectList();
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log("🚀 ~ file: index.js ~ line 52 ~ this.$refs[name].validate ~ submit");
        } else {
          return false;
        }
      });
    },
    // table
    handleClickRow() {},
    handleClickCell() {},
    handleDblClickCell() {},
    handleSelectionChange(val) {
      this.list.selection = val;
    },
    handleRowDblClick() {},
    /**
     * 右键表格行，显示菜单
     */
    handleRowContextMenu(row, column, event) {
      // event.preventDefault()
      this.row = row;
      // this.$refs.contextmenu.show({ top: event.clientY, left: event.clientX });
    },
    //

    // pagination
    handleSizeChange(val) {
      this.list.size = val;
      this.handleSelectList();
    },
    handleCurrentChange(val) {
      this.list.page = val;
      this.handleSelectList();
    },
    // mouse
    /**
     * 隐藏菜单
     */
    handleMouseDown() {
      this.row = null;
      // this.$refs.contextmenu.hide()
    },
    // actions
    handleInsertItem(data = {}, showMsg = true) {
      this.form.loading = true;
      return this.requestInsertItem({
        ...this.form.data,
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
    handleImportItem() {},
    handleDeleteItem() {},
    handleDeleteList(data = {}, showMsg = true) {
      return this.$confirm("此操作将永久删除所选内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.list.loading = true;
        return typechoMetaDelete({
          ...this.form.data,
          ...data,
        })
          .then((res) => {
            this.$message.success(`删除成功`);
            return Promise.resolve(res);
          })
          .finally(() => {
            this.form.loading = false;
          });
      });
    },
    handleUpdateItem(data = {}, showMsg = true) {
      this.form.loading = true;
      return this.requestUpdateItem({
        ...this.form.data,
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
    handleSelectList(data = {}, showMsg = true) {
      this.list.loading = true;
      return this.requestSelectList({
        ...this.form.data,
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
    handleSelectTree() {},
    handleSelectItem(data, showMsg = true) {
      this.form.loading = true;
      return this.requestSelectItem({
        ...this.form.data,
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
    handleSelectCount(data, showMsg = true) {
      this.loading = true;
      this.requestSelectCount(data).finally(() => {
        this.loading = true;
      });
    },
    handleExportItem() {},

    // apis
    requestInsertItem() {
      return Promise.resolve({});
    },
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
  },
};
