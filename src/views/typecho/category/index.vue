<template>
  <div>
    <el-card :body-style="{ padding: '8px' }">
      <el-row>
        <el-col>
          <span style="float: right">
            <el-tooltip effect="dark" content="新增标识" placement="top">
              <el-button size="mini" icon="el-icon-plus" type="primary" circle />
            </el-tooltip>
            <el-tooltip effect="dark" content="批量删除标识" placement="top">
              <el-button size="mini" icon="el-icon-delete" type="danger" circle />
            </el-tooltip>
            <el-tooltip effect="dark" content="批量修改标识" placement="top">
              <el-button size="mini" icon="el-icon-edit" type="primary" circle disabled />
            </el-tooltip>
          </span>
        </el-col>
      </el-row>
    </el-card>
    <el-card :body-style="{ padding: '2px' }">
      <el-table v-loading="table.loading" size="mini" border :data="table.data" height="calc(100vh - 240px)" @selection-change="handleSelectionChange">
        <slot v-for="(col, index) in table.columns" :name="col.slot ? col.slot : 'el-table-column-' + index">
          <el-table-column align="center" show-overflow-tooltip :type="col.type" :prop="col.prop" :label="col.label" :width="col.width" />
        </slot>
      </el-table>
    </el-card>
    <el-card :body-style="{ padding: '8px' }">
      <el-pagination :current-page="table.page" :page-sizes="[10, 20, 50, 100]" :page-size="table.size" layout="total, sizes, prev, pager, next, jumper" :total="table.total" style="" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { typechoMetaInsert, typechoMetaDelete, typechoMetaUpdate, typechoMetaTypeList, typechoMetaInfo, typechoMetaList, typechoMetaTree } from "@/api/typecho";
export default {
  data() {
    return {
      form: {
        type: "category",
        parent: 0,
      },
      table: {
        loading: false,
        data: [],
        total: 0,
        page: 1,
        size: 20,
        selection: [],
        columns: [
          { type: "selection", width: 45 },
          { prop: "mid", label: "编号", width: 80 },
          { prop: "name", label: "名称", width: 180 },
          { prop: "slug", label: "别名", width: 180 },
          { prop: "type", label: "类型", width: 100 },
          { prop: "description", label: "描述" },
          { prop: "count", label: "关联", width: 55 },
          { prop: "order", label: "排序", width: 55 },
          { prop: "parent", label: "上一级", width: 80 },
        ],
      },
    };
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      typechoMetaList(this.form).then((res) => {
        this.table.data = res.rows;
        this.table.total = res.total;
        this.table.page = res.page;
        this.table.size = res.size;
      });
    },
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style></style>
