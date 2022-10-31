<script>
import { deleteMetaList, selectMetaList, selectMetaCount } from "@/api/meta";
import ElViewTable from "@/components/ElementView/ElViewTable.vue";
export default {
  name: "TypechoContentList",
  extends: ElViewTable,
  data() {
    return {
      form: {
        key: "id",
        upload: {
          action: "http://localhost:9090/?/typecho/content/import",
          accept: ".xlsx",
        },
      },
      list: {
        columns: [
          { type: "selection", width: 45 },
          {
            prop: "name",
            label: "名称",
            width: 200,
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
          {
            prop: "type",
            label: "类型",
            width: 100,
            slotHeader: {
              component: "el-select",
            },
          },
          {
            prop: "description",
            label: "描述",
          },
          { prop: "order", label: "权重", width: 55 },
        ],
      },
    };
  },
  created() {
    selectMetaCount({ type: "option", slug: "meta.type", columns: ["id", "name", "description"] }).then((res) => {
      this.list.columns[this.list.columns.findIndex((v) => v.prop === "type")].slotHeader.options = res.rows.map((v) => ({ ...v, value: v.channel }));
    });
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/typecho/content" });
    },
    requestDeleteList: deleteMetaList,
    requestSelectList: selectMetaList,
  },
};
</script>

<style lang="scss" scoped></style>
