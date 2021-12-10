<template>
  <el-tabs stretch type="border-card">
    <el-tab-pane lazy label="文章管理">
      <TypechoPost />
    </el-tab-pane>
    <el-tab-pane lazy label="标识管理">
      <TypechoMeta />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import TypechoMeta from "./meta";
import TypechoPost from "./post";
export default {
  components: {
    TypechoPost,
    TypechoMeta,
  },
};
</script>
