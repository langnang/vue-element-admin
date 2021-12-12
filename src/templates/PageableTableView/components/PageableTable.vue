<template>
  <div>
    <el-table v-loading="table.loading" border size="mini" :data="table.data" @selection-change="handleSelectionChange" @row-dblclick="handleUpdate">
      <el-table-column align="center" show-overflow-tooltip type="selection" width="45" />
      <el-table-column align="center" show-overflow-tooltip prop="title" label="标题" width="200">
        <template v-slot="{ row }">
          <el-link type="primary" :href="row.url" :underline="false" target="_blank" style="font-size: 12px">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="keywords" label="关键字" width="350" />
      <el-table-column align="center" show-overflow-tooltip prop="description" label="描述" />
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
  </div>
</template>
<script>
import { Table } from "element-ui";
export default {
  extends: Table,
};
</script>
