import { typechoMetaInsert, typechoMetaDelete, typechoMetaUpdate, typechoMetaTypeList, typechoMetaInfo, typechoMetaList, typechoMetaTree, selectMetaCount } from "@/api/typecho";
export const meta = {
  data() {
    return {
      meta: {
        loading: false,
        form: {
          mid: null,
          name: null,
          slug: null,
          type: null,
          description: null,
          count: null,
          order: null,
          parent: null,
        },
        list: {
          loading: false,
          data: [],
          total: 0,
          page: 1,
          size: 20,
          selection: [],
        },
        tree: {
          loading: false,
          data: [],
          total: 0,
          page: 1,
          size: 20,
          selection: [],
        },
        info: {},
      },
    };
  },
  computed: {},
  methods: {
    handleInsertMetaItem(data = {}, showMsg = true) {
      this.meta.loading = true;
      return typechoMetaInsert({
        ...this.meta.form,
        ...data,
      })
        .then((res) => {
          this.$message.success(`新增成功`);
          return Promise.resolve(res);
        })
        .finally(() => {
          this.meta.loading = false;
        });
    },
    handleDeleteMetaList(data, showMsg = true) {
      return this.$confirm("此操作将永久删除所选内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.meta.loading = true;
        return typechoMetaDelete({
          ...this.meta.form,
          ...data,
        })
          .then((res) => {
            this.$message.success(`删除成功`);
            return Promise.resolve(res);
          })
          .finally(() => {
            this.meta.loading = false;
          });
      });
    },
    handleUpdateMetaItem(data, showMsg = true) {
      this.meta.loading = true;
      return typechoMetaUpdate({
        ...this.meta.form,
        ...data,
      })
        .then((res) => {
          this.$message.success(`修改成功`);
          return Promise.resolve(res);
        })
        .finally(() => {
          this.meta.loading = false;
        });
    },
    handleSelectMetaCount(data = {}, showMsg = true) {
      this.meta.loading = true;
      return selectMetaCount({
        ...this.form,
        ...data,
      }).finally(() => {
        this.meta.list.loading = false;
      });
    },
    handleSelectMetaList(data = {}, showMsg = true) {
      this.meta.list.loading = true;
      return typechoMetaList({
        ...this.meta.form,
        page: this.meta.list.page,
        size: this.meta.list.size,
        ...data,
      })
        .then((res) => {
          this.meta.list.data = res.rows;
          this.meta.list.total = res.total;
          this.meta.list.page = res.page;
          this.meta.list.size = res.size;
          return Promise.resolve(res);
        })
        .finally(() => {
          this.meta.list.loading = false;
        });
    },
    handleSelectMetaTree() {},
    handleSelectMetaItem(data, showMsg = true) {
      this.meta.loading = true;
      return typechoMetaInfo({
        ...this.meta.form,
        ...data,
      })
        .then((res) => {
          this.meta.info = { ...res };
          return Promise.resolve(res);
        })
        .finally(() => {
          this.meta.loading = false;
        });
    },
  },
};

export const metaViewTable = {
  created() {
    this.meta.form.type = this.$route.query.type || "option";
    this.meta.form.parent = this.$route.query.parent || 0;
    this.handleQuery();
  },
  methods: {
    handleBack() {
      if (this.meta.form.parent === 0) {
        this.$router.push({ path: "/typecho/meta" });
      } else {
        this.handleSelectMetaItem({ mid: this.meta.form.parent }).then((res) => {
          this.meta.form.parent = res.parent;
          this.$router.push({ query: { type: this.meta.form.type, parent: this.meta.form.parent } });
          this.handleQuery();
        });
      }
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.handleQuery();
    },
    handleQuery(resetPage = true) {
      // 重置页码
      if (resetPage) this.meta.list.page = 1;
      this.handleSelectMetaList();
    },
    handleSelectionChange(val) {
      this.meta.list.selection = val;
    },
    handleSizeChange(val) {
      this.meta.list.size = val;
      this.handleQuery();
    },
    handleCurrentChange(val) {
      this.meta.list.page = val;
      this.handleQuery(false);
    },
    handleDelete() {
      this.handleDeleteMetaList({ mids: this.meta.list.selection.map((v) => v.mid) }).then((res) => {
        this.handleQuery();
      });
    },
    handleRowDblClick(row, column, event) {
      this.meta.form.parent = row.mid;
      this.$router.push({ query: { type: this.meta.form.type, parent: this.meta.form.parent } });
      this.handleQuery();
    },
  },
};

export const metaViewForm = {
  created() {
    if (this.$route.query.mid) {
      this.meta.form.mid = this.$route.query.mid;
      this.handleSelectMetaItem();
    } else {
      this.meta.form.type = this.$route.query.type || "option";
    }
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/typecho/meta/list", query: { type: meta.form.type } });
    },
    handleSubmit() {
      if (this.meta.form.mid) {
        this.handleUpdateMetaItem();
      } else {
        this.handleInsertMetaItem().then((res) => {
          this.meta.form = { ...res };
          this.$router.push({ path: "/typecho/meta/info", query: { mid: res.mid } });
          this.handleSelectMetaItem({ mid: res.mid });
        });
      }
    },
  },
};

export const content = {};

export const contentViewTable = {};
export const contentViewForm = {};

export default {
  data() {
    return {
      typecho: {
        meta: {},
        content: {},
      },
    };
  },
};
