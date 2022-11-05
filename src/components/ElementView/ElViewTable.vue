<template>
  <div>
    <el-card :body-style="{ padding: '4px' }" style="margin-bottom: 8px">
      <el-form ref="form" size="mini" :model="form.data">
        <el-table
          v-loading="list.loading"
          v-contextmenu:contextmenu
          size="mini"
          border
          :data="list.data"
          height="calc(100vh - 160px)"
          @selection-change="handleTableSelectionChange"
          @cell-click="handleTableCellClick"
          @cell-dblclick="handleTableCellDblClick"
          @row-click="handleTableRowClick"
          @row-dblclick="handleTableRowDblClick"
          @row-contextmenu="handleTableRowContextMenu"
          @mousedown.native="handleMouseDown"
        >
          <slot v-for="(col, index) in list.columns" :name="col.slot ? col.slot : 'el-table-column-' + index">
            <el-table-column align="center" show-overflow-tooltip :type="col.type" :prop="col.prop" :label="col.label" :width="col.width">
              <template :slot="col.slotHeader ? 'header' : false" slot-scope="{}">
                <el-form-item :prop="col.prop">
                  <component :is="col.slotHeader.component || 'el-input'" v-model="form.data[col.prop]" class="text-center" :placeholder="col.slotHeader.placeholder || col.label" clearable filterable v-bind="col.slotHeader.bind" v-on="col.slotHeader.on">
                    <el-option v-for="item in col.slotHeader.options || []" :key="item.value" :label="item.label" :value="item.value" v-bind="item.bind" />
                  </component>
                </el-form-item>
              </template>
              <template :slot="col.type ? false : 'default'" slot-scope="{ row }">
                {{ col.filter ? col.filter(row[col.prop], row, col) : row[col.prop] }}
              </template>
            </el-table-column>
          </slot>
          <slot />
          <template slot="empty">
            <el-empty />
          </template>
          <template #append>
            <v-contextmenu ref="contextmenu">
              <v-contextmenu-item @click="handleGo('insertItem')"><i class="el-icon-plus" />&nbsp;新增</v-contextmenu-item>
              <v-contextmenu-item :disabled="!list.row" @click="handleGo('updateItem')"><i class="el-icon-edit" />&nbsp;修改</v-contextmenu-item>
              <v-contextmenu-item :disabled="!list.row" @click="handleOperateDeleteList({})"><i class="el-icon-delete" />&nbsp;删除</v-contextmenu-item>
              <v-contextmenu-item :disabled="!list.row" @click="handleGo('selectItem')"><i class="el-icon-info" />&nbsp;详情</v-contextmenu-item>
            </v-contextmenu>
          </template>
        </el-table>
      </el-form>
    </el-card>
    <el-card ref="footer" :body-style="{ padding: '4px 8px' }">
      <el-row :gutter="8">
        <el-col :span="-1">
          <el-pagination
            :current-page="list.page"
            :page-sizes="[10, 20, 50, 100]"
            :pager-count="5"
            :page-size="list.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total"
            style="padding: 0"
            @size-change="handlePaginationSizeChange"
            @current-change="handlePaginationCurrentChange"
          />
        </el-col>
        <el-col :span="-1" style="float: right">
          <el-button size="mini" type="success" @click="handleQuery">查询</el-button>
          <el-button size="mini" type="info" @click="handleReset('form')">重置</el-button>
          <el-button size="mini" type="primary" @click="handleGo('insertItem')">新增</el-button>
          <el-button size="mini" type="danger" :disabled="list.selection.length === 0" @click="handleOperateDeleteList">删除</el-button>
          <el-button size="mini" type="warning" :disabled="list.selection.length !== 1" @click="handleGo('updateItem')">修改</el-button>
          <el-upload class="el-button el-button--text" disabled v-bind="form.upload" style="padding: 0; border: 0" @http-request="handleUploadHttpRequest">
            <el-button size="mini" type="primary" disabled>导入</el-button>
          </el-upload>
          <el-button size="mini" type="warning" disabled>导出</el-button>
          <el-button size="mini" @click="handleBack">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="dialog.visible" :title="dialog.title" v-bind="dialog.bind">
      <el-row :gutter="20">
        <router-link v-for="(item, index) in dialog.data" :key="index" :to="item.to">
          <el-col :span="6">
            <el-card>
              {{ item.label }}
            </el-card>
          </el-col>
        </router-link>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixins";
export default {
  name: "ElViewTable",
  mixins: [mixin],
  props: {},
  data() {
    return {};
  },
  computed: {
    tableHeight() {
      return `calc(100vh - 160px - ${this.$refs.footer?.$el?.offsetHeigh || 0}px)`;
    },
  },
  created() {
    // 根据表格列名生成form参数
    // resetFields() 会导致form中未命名的参数无法输入
    this.form.data = {
      ...this.form.data,
      ...this.list.columns.reduce((t, v) => {
        t[v.prop] = null;
        return t;
      }, {}),
      ...this.$route.query,
    };
    this.handleOperateSelectList();
  },
};
</script>

<style></style>
