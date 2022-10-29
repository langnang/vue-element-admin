<template>
  <div>
    <el-card :body-style="{ padding: '20px 0 20px 20px' }" style="margin-bottom: 8px">
      <el-scrollbar style="height: calc(100vh - 192px)">
        <el-form ref="form" v-loading="form.loading" :model="form.data" :rules="form.rules" v-bind="form.bind" label-width="80px" style="padding-right: 20px">
          <el-form-item v-for="item in form.items || []" :key="item.prop" :label="item.label">
            <component :is="item.component || 'el-input'" v-model="form.data[item.prop]" clearable :placeholder="item.placeholder || item.label" v-bind="item.bind">
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
  created() {
    if (this.$route.query[this.form.key]) {
      this.form.data[this.form.key] = this.$route.query[this.form.key];
      this.handleSelectItem();
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.form.data[this.form.key]) {
            this.handleUpdateItem();
          } else {
            this.handleInsertItem().then((res) => {
              this.form.data = { ...res };
              this.$router.push({ query: { [this.form.key]: res[this.form.key] } });
              this.handleSelectItem({ [this.form.key]: res[this.form.key] });
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
