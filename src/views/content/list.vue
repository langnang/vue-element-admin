<script>
import { deleteContentList, selectContentList } from "@/api/content";
import { selectMetaCount } from "@/api/meta";
import ElViewTable from "@/components/ElementView/ElViewTable.vue";
export default {
  name: "TypechoContentList",
  extends: ElViewTable,
  data() {
    return {
      form: {
        primary_keys: ["cid"],
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
          {
            prop: "type",
            label: "类型",
            width: 200,
            slotHeader: {
              component: "el-select",
              options: [],
              on: {
                // focus: () => {
                // const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "type")];
                // selectMetaCount({ type: "option", slug: "content.type", columns: ["name", "description"] }).then((res) => {
                //   $el.slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
                // });
                // },
              },
            },
          },
          {
            prop: "status",
            label: "状态",
            width: 100,
            slotHeader: {
              component: "el-select",
              options: [],
              on: {
                focus: () => {
                  const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "status")];
                  selectMetaCount({ type: "option", slug: "content.status", columns: ["name", "description"] }).then((res) => {
                    $el.slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
                  });
                },
              },
            },
          },
          { prop: "commentsNum", label: "回复数", width: 100 },
        ],
      },
      dialog: {
        data: [
          { label: "接口", to: { path: "/content/info", query: { type: "api" } } },
          { label: "文档", to: { path: "/content/info", query: { type: "post" } } },
        ],
      },
    };
  },
  created() {
    const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "type")];
    selectMetaCount({ type: "option", slug: "content.type", columns: ["name", "description"] }).then((res) => {
      $el.slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
    });
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/content" });
    },
    requestDeleteList: deleteContentList,
    requestSelectList: selectContentList,
  },
};
</script>

<style lang="scss" scoped></style>
