<template>
  <el-form>
    <el-form-item>
      <el-input v-model="url" placeholder="请输入地址">
        <el-select slot="prepend" v-model="method" placeholder="请选择" style="width: 100px">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
          <el-option label="PUT" value="put"></el-option>
          <el-option label="DELETE" value="delete"></el-option>
        </el-select>
        <el-button slot="append" type="primary" @click="handleRequest">Execute</el-button>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="header" type="textarea" placeholder="header"> </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="data" type="textarea" placeholder="data"> </el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="response.type" placeholder="请选择">
        <el-option label="Text" value="text"></el-option>
        <el-option label="Array" value="array"></el-option>
        <el-option label="Object" value="object"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { proxyRequest } from "@/api";
export default {
  name: "ApiForm",
  props: {},
  data() {
    return {
      method: "get",
      url: "",
      header: "{}",
      data: "{}",
      response: {
        type: "text",
        corr: {},
        data: {},
      },
    };
  },
  methods: {
    getValue() {},
    handleRequest() {
      proxyRequest({ url: this.url, method: this.method }).then((res) => {
        console.log("🚀 ~ file: index.vue ~ line 34 ~ handleRequest ~ res", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
