<template>
  <div>
    <el-card :body-style="{ padding: '20px 0 20px 20px' }" style="margin-bottom: 8px">
      <el-scrollbar style="height: calc(100vh - 192px)">
        <el-form ref="form" v-loading="form.loading" :model="form.data" :rules="form.rules" v-bind="form.bind" label-width="80px" style="padding-right: 20px">
          <el-form-item v-for="item in form.items || []" :key="item.prop" :label="item.label">
            <component :is="item.component || 'el-input'" v-model="form.data[item.prop]" :placeholder="item.placeholder || item.label" clearable filterable v-bind="item.bind" v-on="item.on">
              <el-option v-for="opt in item.options || []" :key="opt.value" :label="opt.label" :value="opt.value" v-bind="opt.bind" />
            </component>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-card>
    <el-card :body-style="{ padding: '4px 8px' }">
      <el-row :gutter="8">
        <el-col :span="-1" />
        <el-col :span="-1" style="float: right">
          <el-button size="mini" type="primary" @click="handleSubmit('form')">保存</el-button>
          <el-button size="mini" @click="handleBack">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import mixin from "@/mixins";
export default {
  name: "ElViewForm",
  mixins: [mixin],
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {
    if (this.form.primary_keys.every((key) => this.$route.query[key])) {
      this.form.primary_keys.forEach((key) => {
        this.form.data[key] = this.$route.query[key];
      });
      this.handleOperateSelectItem();
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.form.primary_keys.every((key) => this.form.data[key])) {
            this.handleOperateUpdateItem();
          } else {
            this.handleOperateInsertItem().then((res) => {
              this.form.data = { ...res };
              this.$router.push({
                query: this.form.primary_keys.reduce((t, key) => {
                  t[key] = (this.list.row || this.list.selection[0])[key];
                  return t;
                }, {}),
              });
              this.handleOperateSelectItem(
                this.form.primary_keys.reduce((t, key) => {
                  t[key] = (this.list.row || this.list.selection[0])[key];
                  return t;
                }, {})
              );
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped></style>
