<template>
  <el-row :gutter="20">
    <el-col v-for="item in meta.list.data" :key="item.mid" :span="6">
      <el-card>
        <template slot="header">
          {{ item.description }} <small> {{ item.name }}</small>
          <router-link :to="{ path: 'meta/list', query: { type: item.name } }">详情</router-link>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import meta from "./meta-mixin";
export default {
  mixins: [meta],
  data() {
    return {};
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      this.handleSelectMetaList({
        type: "option",
        slug: "meta.type",
        size: Number.MAX_SAFE_INTEGER,
      });
    },
  },
};
</script>

<style lang="sass" scoped></style>
