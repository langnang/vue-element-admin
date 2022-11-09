const data = function () {
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
};
const operateMethos = {};

const tableEvents = {};

const tableMethods = {};

const formMethods = {};
export const homeMixin = {};
export const tableMixin = {
  data,
  methods: {
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    handleTableSelect(selection, row) {},
    // 当用户手动勾选全选 Checkbox 时触发的事件
    handleTableSelectAll(selection) {},
    // 当选择项发生变化时会触发该事件
    handleTableSelectionChange(selection) {
      this.list.selection = selection;
    },
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
  },
};
export const formMixin = {};
