<template>
  <el-upload class="upload-demo" action="/api/meta/upload" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" :http-request="handleUploadHttpRequest">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      fileList: [
        { name: "food.jpeg", url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" },
        { name: "food2.jpeg", url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" },
      ],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log("🚀 ~ file: upload.vue ~ line 20 ~ handleRemove ~ handleRemove", file, fileList);
    },
    handlePreview(file) {
      console.log("🚀 ~ file: upload.vue ~ line 23 ~ handlePreview ~ handlePreview", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleUploadHttpRequest(data) {
      console.log("🚀 ~ file: upload.vue ~ line 32 ~ handleUploadHttpRequest ~ handleUploadHttpRequest", data);
      const fileData = new FormData();
      fileData.append("name", data.file);
      request({ url: data.action, method: "post", data: fileData });
    },
  },
};
</script>
