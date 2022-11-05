<template>
  <el-row v-loading="loading" :gutter="20">
    <el-col :span="24" style="margin-bottom: 20px">
      <el-input v-model="request.url" placeholder="请输入地址">
        <el-select slot="prepend" v-model="request.method" placeholder="请选择" style="width: 120px">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
          <el-option label="PUT" value="put"></el-option>
          <el-option label="DELETE" value="delete"></el-option>
        </el-select>
        <el-button slot="append" type="primary" @click="handleRequest">Send</el-button>
      </el-input>
    </el-col>
    <el-col :span="14">
      <el-card>
        <div slot="header">
          <label for=""> Request </label>
          <el-switch v-model="proxy" active-text="本地代理"> </el-switch>
        </div>
        <el-tabs v-model="request.activeTab" type="border-card">
          <el-tab-pane label="Params" name="params">
            <el-table ref="requestParams" :data="request.params" size="mini" border @selction-change="(...args) => handleTableSelectionChange('requestParams', ...args)">
              <el-table-column type="selection" width="39"></el-table-column>
              <el-table-column prop="key" label="Key" width="160">
                <template slot-scope="{ row }">
                  <el-input v-model="row.key" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="Value" width="220">
                <template slot-scope="{ row }">
                  <el-input v-model="row.value" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="Description">
                <template slot="header">
                  <label>Description</label>
                  <span style="float: right">
                    <el-button icon="el-icon-plus" size="mini" round @click="handleTableInsertRow('requestParams')"></el-button>
                  </span>
                </template>
                <template slot-scope="{ row }">
                  <el-input v-model="row.description" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-empty slot="empty" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            <el-table ref="requestHeaders" :data="request.headers" size="mini" border @selction-change="(...args) => handleTableSelectionChange('requestHeaders', ...args)">
              <el-table-column type="selection" width="39"></el-table-column>
              <el-table-column prop="key" label="Key" width="160">
                <template slot-scope="{ row }">
                  <el-input v-model="row.key" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="Value" width="220">
                <template slot-scope="{ row }">
                  <el-input v-model="row.value" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="Description">
                <template slot="header">
                  <label>Description</label>
                  <span style="float: right">
                    <el-button icon="el-icon-plus" size="mini" round @click="handleTableInsertRow('requestHeaders')"></el-button>
                  </span>
                </template>
                <template slot-scope="{ row }">
                  <el-input v-model="row.description" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-empty slot="empty" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Body" name="body">
            <codemirror ref="requestData" v-model="request.data" :options="cmOptions" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card>
        <div slot="header">Response</div>
        <el-tabs v-model="response.activeTab" v-loading="response.loading" type="border-card">
          <el-tab-pane label="Body" name="body">
            <codemirror ref="reponseData" v-model="response.data" :options="{ ...cmOptions, readonly: true }" />
          </el-tab-pane>
          <el-tab-pane label="Headers" name="headers">
            <el-table :data="response.headers" size="mini" border>
              <el-table-column prop="key" label="Key"> </el-table-column>
              <el-table-column prop="value" label="Value"> </el-table-column>
              <el-empty slot="empty" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { proxyRequest } from "@/api";
import axios from "axios";

import { codemirror } from "vue-codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

// 主题样式（我直接用了纯白色的，看着比较舒服）
import "codemirror/theme/idea.css";
// 括号显示匹配
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
// 括号、引号编辑和删除时成对出现
import "codemirror/addon/edit/closebrackets";
// 折叠代码要用到一些玩意
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";

export default {
  name: "ApiForm",
  components: {
    codemirror,
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          method: "get",
          url: "",
          params: [],
          headers: [
            { key: "Content-Type", value: "application/json" },
            { key: "Accept", value: "*/*" },
            { key: "Accept-Encoding", value: "gzip, deflate, br" },
            { key: "Connection", value: "keep-alive" },
          ],
          data: "{}",
        };
      },
    },
  },

  data() {
    return {
      loading: false,
      proxy: true,
      request: {
        loading: false,
        activeTab: "body",
        method: "get",
        url: "",
        params: [],
        headers: [],
        data: "{}",
      },
      response: {
        loading: false,
        activeTab: "body",
        headers: [],
        type: "text",
        corr: {},
        data: "",
      },
      headerSelection: [],
      cmOptions: {
        tabSize: 2,
        theme: "idea",
        mode: "text/javascript",
        line: true,
        lineNumbers: true,
        lineWrapping: true,
      },
    };
  },
  computed: {},
  watch: {
    value: {
      handler(val) {
        console.log("🚀 ~ file: index.vue ~ line 188 ~ handler ~ val", val);
        this.request.method = val.method;
        this.request.url = val.url;
        this.request.data = val.data;
        this.request.data = val.data;
        this.request.params = val.params;
        this.request.headers = val.headers;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.request.headers.forEach((v) => {
      this.$refs.requestHeaders.toggleRowSelection(v, v.checked);
    });
  },
  methods: {
    getValue() {
      return this.request;
    },
    handleRequest() {
      this.loading = true;
      let requestFunc = axios;
      if (this.proxy) requestFunc = proxyRequest;
      requestFunc({
        ...this.request,
        params: (this.request.params || []).reduce((t, v) => {
          t[v.key] = v.value;
          return t;
        }, {}),
        headers: (this.request.headers || []).reduce((t, v) => {
          t[v.key] = v.value;
          return t;
        }, {}),
      })
        .then((res) => {
          console.log("🚀 ~ file: index.vue ~ line 216 ~ .then ~ res", res);
          this.response.data = JSON.stringify(res.data, null, 2);
          const headers = [];
          for (let key in res.headers) {
            headers.push({ key, value: res.headers[key] });
          }
          this.response.headers = headers;
          console.log("🚀 ~ file: index.vue ~ line 206 ~ .then ~ headers", headers);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleTableSelectionChange(ref, selction) {
      this[ref + "Selection"] = selection;
    },
    handleTableInsertRow(ref) {
      let target = [];
      switch (ref) {
        case "requestParams":
          target = this.request.params;
          break;
        case "requestHeaders":
          target = this.request.headers;
          break;
        default:
          break;
      }
      target.push({});
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-card__header {
    padding: 10px 10px;
  }
}
.el-button--mini.is-round {
  padding: 3px 10px;
}
</style>
