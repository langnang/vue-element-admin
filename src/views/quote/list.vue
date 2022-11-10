<script>
import { getQuoteConfig, deleteQuoteList, selectQuoteList, selectQuoteCount } from "@/api/quote";
import ElViewTable from "@/templates/ElViewTable";
export default {
  name: "TypechoContentList",
  extends: ElViewTable,
  data() {
    return {
      form: {
        primary_keys: ["id"],
        upload: {
          action: "http://localhost:9090/?/typecho/content/import",
          accept: ".xlsx",
        },
      },
      list: {
        columns: [
          { type: "selection", width: 45 },
          {
            prop: "type",
            label: "类型",
            width: 100,
            slotHeader: {
              component: "el-select",
              options: [],
              on: {},
            },
          },
          {
            prop: "text",
            label: "内容",
          },
          { prop: "order", label: "权重", width: 55 },
        ],
      },
    };
  },
  created() {
    const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "type")];
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/meta" });
    },
    requestDeleteList: deleteQuoteList,
    requestSelectList: selectQuoteList,
  },
};
</script>

<style lang="scss" scoped></style>
