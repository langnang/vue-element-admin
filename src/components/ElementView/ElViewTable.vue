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
          @selection-change="handleSelectionChange"
          @row-dblclick="handleRowDblClick"
          @row-contextmenu="(row) => ($data.row = row)"
          @mousedown.native="() => ($data.row = null)"
        >
          <slot v-for="(col, index) in list.columns" :name="col.slot ? col.slot : 'el-table-column-' + index">
            <el-table-column align="center" show-overflow-tooltip :type="col.type" :prop="col.prop" :label="col.label" :width="col.width">
              <template :slot="col.slotHeader ? 'header' : false" slot-scope="{}">
                <el-form-item :prop="col.prop">
                  <component :is="col.slotHeader.component || 'el-input'" v-model="form.data[col.prop]" class="text-center" clearable :placeholder="col.slotHeader.placeholder || col.label" v-bind="col.slotHeader.bind">
                    <el-option v-for="item in col.slotHeader.options || []" :key="item.value" :label="item.label" :value="item.value" v-bind="item.bind" />
                  </component>
                </el-form-item>
              </template>
            </el-table-column>
          </slot>
          <slot />
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
          <el-pagination :current-page="list.page" :page-sizes="[10, 20, 50, 100]" :page-size="list.size" layout="total, sizes, prev, pager, next, jumper" :total="list.total" style="padding: 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-col>
        <el-col :span="-1" style="float: right">
          <el-button size="mini" type="success" @click="handleQuery">查询</el-button>
          <el-button size="mini" type="info" @click="handleReset('form')">重置</el-button>
          <el-button size="mini" type="primary" @click="handleGo({ path: '/typecho/content/info' })">新增</el-button>
          <el-button size="mini" type="danger" :disabled="list.selection.length === 0">删除</el-button>
          <el-button size="mini" type="warning" :disabled="list.selection.length !== 1" @click="handleGo('selectItem')">修改</el-button>
          <el-button size="mini" type="primary">导入</el-button>
          <el-button size="mini" type="warning">导出</el-button>
          <el-button size="mini" @click="handleBack">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
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
  computed: {},
  created() {
    console.log(this.$route);
    // 根据表格列名生成form参数
    // resetFields() 会导致form中未命名的参数无法输入
    this.form.data = {
      ...this.form.data,
      ...this.list.columns.reduce((t, v) => {
        t[v.prop] = null;
        return t;
      }, {}),
    };
    this.handleSelectList();
  },
};
</script>

<style></style>
