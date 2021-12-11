<template>
  <el-form-item style="float: right; margin-right: 0">
    <v-slot name="prepend" />
    <el-tooltip effect="dark" content="新增" placement="bottom">
      <el-button circle size="mini" type="primary" icon="el-icon-plus" @click="$emit('handle-insert')" />
    </el-tooltip>
    <v-slot name="1" />
    <el-tooltip effect="dark" content="启动" placement="bottom">
      <el-button circle size="mini" type="primary" icon="el-icon-video-play" :disabled="table.multipleSelection.length === 0" @click="handleUpdateParams({ status: 'queue' })" />
    </el-tooltip>
    <v-slot name="2" />
    <el-tooltip effect="dark" content="停止" placement="bottom">
      <el-button circle size="mini" type="primary" icon="el-icon-video-pause" :disabled="table.multipleSelection.length === 0" @click="handleUpdateParams({ status: 'stop' })" />
    </el-tooltip>
    <v-slot name="3" />
    <el-tooltip effect="dark" content="删除" placement="bottom">
      <el-button circle size="mini" type="danger" icon="el-icon-delete" :disabled="table.multipleSelection.length === 0" @click="$emit('handle-delete')" />
    </el-tooltip>
    <v-slot name="4" />
    <el-tooltip effect="dark" content="上传" placement="bottom" style="display: inline-block; margin-left: 10px; margin-right: 10px">
      <el-upload
        :action="upload_phpspider"
        name="phpspider"
        accept="application/json"
        :headers="{
          Authorization: 'Bearer ' + token,
        }"
        :on-progress="
          () => {
            table.loading = true;
          }
        "
        :on-success="
          () => {
            $message.success('上传成功');
            handleSelect();
          }
        "
      >
        <el-button circle size="mini" type="primary" icon="el-icon-upload2" />
      </el-upload>
    </el-tooltip>
    <v-slot name="5" />
    <el-tooltip effect="dark" content="下载" placement="bottom">
      <el-button circle size="mini" type="primary" icon="el-icon-download" @click="$emit('handle-download')" />
    </el-tooltip>
    <v-slot name="append" />
  </el-form-item>
</template>
<script>
export default {
  props: [],
  methods: {},
};
</script>
