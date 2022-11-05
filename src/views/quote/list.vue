<script>
import { getQuoteConfig, deleteQuoteList, selectQuoteList, selectQuoteCount } from "@/api/meta";
import ElViewTable from "@/components/ElementView/ElViewTable.vue";
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
              component: "el-select",
              options: [],
              bind: {
                clearable: true,
              },
              on: {
                focus: () => {
                  const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "slug")];
                  selectQuoteCount({ type: "option", columns: ["slug"] }).then((res) => {
                    $el.slotHeader.options = res.rows.map((v) => ({ ...v, value: v.slug }));
                  });
                },
              },
            },
          },
          {
            prop: "type",
            label: "类型",
            width: 100,
            slotHeader: {
              component: "el-select",
              options: [],
              on: {
                // focus: () => {
                //   const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "type")];
                //   selectQuoteCount({ type: "option", slug: "default", columns: ["name", "description"] }).then((res) => {
                //     $el.slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
                //   });
                // },
              },
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
    const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "type")];
    selectQuoteCount({ type: "option", slug: "default", columns: ["name", "description"] }).then((res) => {
      $el.slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
    });
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
