<template>
  <div>
    <el-card :body-style="{ padding: '4px' }" style="margin-bottom: 8px">
      <el-form ref="form" size="mini" :model="meta.form">
        <el-table
          v-loading="meta.list.loading"
          v-contextmenu:contextmenu
          size="mini"
          border
          :data="meta.list.data"
          height="calc(100vh - 160px)"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowDblClick"
          @row-contextmenu="(row) => ($data.row = row)"
          @mousedown.native="() => ($data.row = null)"
        >
          <el-table-column align="center" show-overflow-tooltip type="selection" width="44" />
          <el-table-column align="center" show-overflow-tooltip prop="name" label="名称" width="200">
            <template slot="header" slot-scope="{}">
              <el-form-item prop="name">
                <el-input v-model="meta.form.name" class="text-center" name="name" clearable placeholder="名称" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="slug" label="编码" width="200">
            <template slot="header" slot-scope="{}">
              <el-form-item prop="slug">
                <el-input v-model="meta.form.slug" class="text-center" clearable placeholder="编码" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="type" label="类型" width="100" />
          <el-table-column align="center" show-overflow-tooltip prop="description" label="描述" />
          <el-table-column align="center" show-overflow-tooltip prop="count" label="关联数" width="65" />
          <el-table-column align="center" show-overflow-tooltip prop="order" label="权重" width="55" />
          <template slot="empty">
            <el-empty />
          </template>
          <template #append>
            <v-contextmenu ref="contextmenu">
              <v-contextmenu-item>编辑</v-contextmenu-item>
            </v-contextmenu>
          </template>
        </el-table>
      </el-form>
    </el-card>
    <el-card :body-style="{ padding: '4px 8px' }">
      <el-row :gutter="8">
        <el-col :span="-1">
          <el-pagination :current-page="meta.list.page" :page-sizes="[10, 20, 50, 100]" :page-size="meta.list.size" layout="total, sizes, prev, pager, next, jumper" :total="meta.list.total" style="padding: 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-col>
        <el-col :span="-1" style="float: right">
          <el-button size="mini" type="success" @click="handleQuery">查询</el-button>
          <el-button size="mini" type="info" @click="handleReset">重置</el-button>
          <el-button size="mini" type="primary" @click="$router.push({ path: '/typecho/meta/info', query: { type: meta.form.type } })">新增</el-button>
          <el-button size="mini" type="danger" :disabled="meta.list.selection.length === 0" @click="handleDelete">删除</el-button>
          <el-button size="mini" type="warning" :disabled="meta.list.selection.length !== 1" @click="$router.push({ path: '/typecho/meta/info', query: { mid: meta.list.selection[0].mid } })">修改</el-button>
          <el-button size="mini" type="primary">导入</el-button>
          <el-button size="mini" type="warning">导出</el-button>
          <el-button size="mini" @click="handleBack">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { meta, metaViewTable } from "../mixins";
export default {
  mixins: [meta, metaViewTable],
  data() {
    return {
      row: null,
    };
  },
  methods: {
    /**
     * 右键表格行，显示菜单
     */
    handleRowContextMenu(row, column, event) {
      // event.preventDefault()
      this.row = row;
      // this.$refs.contextmenu.show({ top: event.clientY, left: event.clientX });
    },
    /**
     * 隐藏菜单
     */
    handleMouseDown() {
      this.row = null;
      // this.$refs.contextmenu.hide()
    },
  },
};
</script>

<style></style>
