<script>
import { selectMetaCount } from "@/api/meta";
import { insertPublicApiItem, selectPublicApiItem, updatePublicApiItem } from "@/api/public-api";
import ElViewForm from "@/components/ElementView/ElViewForm";
import jsonEditor from "@/components/JsonEditor";
import ApiForm from "@/components/ApiForm";
export default {
  components: {
    jsonEditor,
    ApiForm,
  },
  extends: ElViewForm,
  data() {
    return {
      form: {
        data: {
          response_datatype: "text",
        },
        primary_keys: ["cid"],
        items: [
          { prop: "title", label: "标题" },
          { prop: "slug", label: "编码" },
          {
            prop: "text",
            component: "ApiForm",
            bind: {
              labelWidth: 0,
              autosize: true,
            },
          },
          {
            prop: "response_datatype",
            label: "响应类型",
            component: "el-select",
            options: [
              { value: "text", label: "Text" },
              { value: "array", label: "Array" },
              { value: "object", label: "Object" },
            ],
            bind: {
              labelWidth: 0,
              autosize: true,
            },
          },
          {
            prop: "relation_table",
            label: "关联表",
            component: "el-select",
          },
        ],
      },
    };
  },
  watch: {},
  created() {
    this.form.data = { ...this.form.data, ...this.$route.query };
  },
  methods: {
    getFormData(operate) {
      // console.log("🚀 ~ file: info.vue ~ line 39 ~ getFormData ~ this.form.data", this.form.data);
      if (["insertItem", "updateItem"].indexOf(operate) !== -1) {
        // console.log("🚀 ~ file: info.vue ~ line 40 ~ getFormData ~ 1", 1);
        // console.log(this.$refs);
        // console.log("🚀 ~ file: info.vue ~ line 39 ~ getFormData ~ ", this.$refs["form_item_text"][0].getValue());
        this.form.data.text = this.$refs["form_item_text"][0].getValue();
      }
      return this.form.data;
    },
    handleBack() {
      this.$router.push({ path: "/public-api/list" });
    },
    requestInsertItem: insertPublicApiItem,
    requestSelectItem: selectPublicApiItem,
    requestUpdateItem: updatePublicApiItem,
  },
};
</script>

<style lang="scss" scoped></style>
