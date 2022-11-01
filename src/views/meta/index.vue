<template>
  <el-row :gutter="20">
    <el-col v-for="item in list.data" :key="item.name" :span="6">
      <el-card :body-style="{ padding: 0 }">
        <template slot="header">
          <el-badge :value="item._count">
            {{ item.description }} <small> {{ item.name }}</small>
          </el-badge>
          <router-link :to="{ path: '/meta/list', query: { type: item.name } }" style="float: right">详情</router-link>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import mixin from "@/mixins";
import { selectMetaCount, selectMetaList } from "@/api/meta";
export default {
  mixins: [mixin],
  data() {
    return {};
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      Promise.all([selectMetaList({ type: "option", slug: "default", size: Number.MAX_SAFE_INTEGER }), selectMetaCount({ columns: ["type"] })]).then((res) => {
        const list = [...res[0].rows].map(function (row) {
          row["_count"] = [...res[1].rows].find((v) => v.type === row.name)?._count || 0;
          return row;
        });
        this.list.data = list;
      });
    },
  },
};
</script>

<style lang="sass" scoped></style>
