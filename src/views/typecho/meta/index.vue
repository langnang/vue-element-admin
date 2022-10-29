<template>
  <el-row :gutter="20">
    <el-col v-for="item in meta.list.data" :key="item.mid" :span="6">
      <el-card :body-style="{ padding: 0 }">
        <template slot="header">
          <el-badge :value="item.count_total">
            {{ item.description }} <small> {{ item.name }}</small>
          </el-badge>
          <router-link :to="{ path: '/typecho/meta/list', query: { type: item.name } }" style="float: right">详情</router-link>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { meta } from "../mixins";
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
      Promise.all([
        this.handleSelectMetaList({
          type: "option",
          slug: "meta.type",
          size: Number.MAX_SAFE_INTEGER,
        }),
        this.handleSelectMetaCount({
          columns: "type",
        }),
      ]).then((res) => {
        console.log("🚀 ~ file: index.vue ~ line 36 ~ handleQuery ~ res", res);
        const list = [...res[0].rows].map(function (row) {
          console.log("🚀 ~ file: index.vue ~ line 43 ~ list ~ row", row);
          row["count_total"] = [...res[1].rows].find((v) => v.type === row.name)?.count_total || 0;
          return row;
        });
        this.meta.list.data = list;
      });
    },
  },
};
</script>

<style lang="sass" scoped></style>
