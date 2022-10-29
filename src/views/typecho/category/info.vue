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
            <el-select v-model="meta.form.type" placeholder="请选择标识区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
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
          <el-button size="mini" @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import meta from "./meta-mixin";
export default {
  mixins: [meta],
  data() {
    return {};
  },
  created() {
    if (this.$route.query.mid) {
      this.meta.form.mid = this.$route.query.mid;
      this.handleSelectMetaItem();
    } else {
      this.meta.form.type = this.$route.query.type;
    }
  },
  methods: {
    handleSubmit() {
      if (this.meta.form.mid) {
        this.handleUpdateMetaItem();
      } else {
        this.handleInsertMetaItem().then((res) => {
          this.$router.push({ path: "/typecho/meta/info", query: { mid: res.mid } });
          this.handleSelectMetaItem({ mid: res.mid });
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped></style>
