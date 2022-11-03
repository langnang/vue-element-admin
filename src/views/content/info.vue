<script>
import { selectMetaCount } from "@/api/meta";
import { insertContentItem, selectContentItem, updateContentItem } from "@/api/content";
import ElViewForm from "@/components/ElementView/ElViewForm";
export default {
  extends: ElViewForm,
  data() {
    return {
      form: {
        primary_keys: ["cid"],
        items: [
          { prop: "title", label: "标题" },
          { prop: "slug", label: "编码" },
          {
            prop: "type",
            label: "类型",
            component: "el-select",
            options: [],
            on: {
              // focus: () => {
              //   const $el = this.form.items[this.form.items.findIndex((v) => v.prop === "type")];
              //   selectMetaCount({ type: "option", slug: "content.type", columns: ["name", "description"] }).then((res) => {
              //     $el.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
              //   });
              // },
            },
          },
          {
            prop: "text",
            label: "内容",
            bind: {
              type: "textarea",
              autosize: true,
            },
          },
        ],
      },
    };
  },
  created() {
    const $el = this.form.items[this.form.items.findIndex((v) => v.prop === "type")];
    selectMetaCount({ type: "option", slug: "content.type", columns: ["name", "description"] }).then((res) => {
      $el.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
    });
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/content/list" });
    },
    requestInsertItem: insertContentItem,
    requestSelectItem: selectContentItem,
    requestUpdateItem: updateContentItem,
  },
};
</script>

<style lang="scss" scoped></style>
