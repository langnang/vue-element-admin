<template>
  <div v-loading="loading">
    <el-row :gutter="10">
      <el-col v-for="item in list.data" :key="item.name" :span="6" style="margin-bottom: 10px">
        <router-link :to="item.to">
          <el-card shadow="hover" :body-style="{ position: 'relative', 'text-align': 'center' }">
            <el-image :src="$mock.Random.dataImage('100x45', '')" style="width: 100%"></el-image>
            <div style="position: absolute; top: calc(50% - 18px); margin: 0 -8px; width: 100%; color: white; font-size: 36px; line-height: 24px">
              <template v-if="item.icon">
                <i :class="item.icon"></i>
              </template>
              <template v-else>
                <span>{{ item.label }}</span>
                <el-badge v-if="item.badge" type="primary" :value="item.badge"></el-badge>
              </template>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      list: {
        data: [],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-col {
  margin-bottom: 8px;
}
</style>
