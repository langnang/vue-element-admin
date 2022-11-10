<script>
import { deleteContentList, selectContentList, selectMetaCount } from "@/api/typecho";
import ElViewTable from "@/templates/ElViewTable";
export default {
  name: "TypechoContentList",
  extends: ElViewTable,
  data() {
    return {
      form: {
        key: "cid",
        deleteOperateKey: "cids",
        upload: {
          action: "http://localhost:9090/?/typecho/content/import",
          accept: ".xlsx",
        },
      },
      list: {
        columns: [
          { type: "selection", width: 45 },
          {
            prop: "title",
            label: "标题",
            slotHeader: {
              component: "el-input",
            },
          },
          {
            prop: "slug",
            label: "编码",
            width: 200,
            slotHeader: {
              component: "el-input",
            },
          },
          { prop: "type", label: "类型", width: 100 },
          {
            prop: "status",
            label: "状态",
            width: 100,
            slotHeader: {
              component: "el-select",
              options: [],
            },
          },
          { prop: "commentsNum", label: "回复数", width: 100 },
        ],
      },
    };
  },
  created() {
    selectMetaCount({ type: "option", slug: "content.status", columns: ["mid", "name", "description"] }).then((res) => {
      this.list.columns[4].slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
    });
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/typecho/content" });
    },
    requestDeleteList: deleteContentList,
    requestSelectList: selectContentList,
  },
};
</script>

<style lang="scss" scoped></style>
