<template>
  <div class="app-main">
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
    </el-form>
    <el-pageable-table v-loading="table.loading" v-bind="table" @size-change="handleSizeChange" @current-page-change="handleCurrentChange" />
  </div>
</template>
<script>
import { crawler_website_info, select_website_list } from "@/api/website";
export default {
  data() {
    return {
      form: {
        url: "",
        keywords: "",
        description: "",
      },
      table: {
        loading: false,
        border: true,
        cols: [
          {
            label: "编号",
            prop: "id",
            align: "center",
            "show-overflow-tooltip": true,
            width: 80,
          },
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
        ],
        data: [],
        pagination: {
          layout: "total, sizes, prev, pager, next, jumper",
          currentPage: 1,
          pageSizes: [10, 20, 50, 100],
          pageSize: 10,
          total: 400,
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSelect() {
      this.table.pagination.currentPage = 1;
      this.getList();
    },
    handleReset() {},
    getList() {
      this.table.loading = true;
      select_website_list({
        ...this.form,
        size: this.table.pagination.pageSize,
        page: this.table.pagination.currentPage,
      })
        .then((res) => {
          this.table.data = res.rows;
          this.table.pagination.total = res.total;
          this.table.pagination.currentPage = res.page;
          this.table.pagination.pageSize = res.size;
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.table.pagination.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.table.pagination.pageSize = val;
      this.getList();
    },
  },
};
</script>
