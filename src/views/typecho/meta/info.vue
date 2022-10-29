<template>
  <div>
    <el-card :body-style="{ padding: '20px 0 20px 20px' }" style="margin-bottom: 8px">
      <el-scrollbar style="height: calc(100vh - 192px)">
        <el-form ref="form" :model="meta.form" label-width="80px" style="padding-right: 20px">
          <el-form-item label="标识名称">
            <el-input v-model="meta.form.name" />
          </el-form-item>
          <el-form-item label="标识编码">
            <el-input v-model="meta.form.slug" />
          </el-form-item>
          <el-form-item label="标识类型">
            <el-select v-model="meta.form.type" disabled placeholder="请选择标识区域" />
          </el-form-item>
          <el-form-item label="标识描述">
            <el-input v-model="meta.form.description" type="textarea" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-card>
    <el-card :body-style="{ padding: '4px 8px' }">
      <el-row :gutter="8">
        <el-col :span="-1" />
        <el-col :span="-1" style="float: right">
          <el-button size="mini" type="primary" @click="handleSubmit">保存</el-button>
          <el-button size="mini" @click="$router.push({ path: '/typecho/meta/list', query: { type: meta.form.type } })">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { meta, metaViewForm } from "../mixins";
export default {
  mixins: [meta, metaViewForm],
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped></style>
