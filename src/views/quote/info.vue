<script>
import { getQuoteConfig, insertQuoteItem, selectQuoteItem, updateQuoteItem, selectQuoteCount } from "@/api/quote";
import ElViewForm from "@/components/ElementView/ElViewForm";
export default {
  extends: ElViewForm,
  data() {
    return {
      form: {
        primary_keys: ["mid"],
        items: [
          { prop: "name", label: "标题" },
          {
            prop: "slug",
            label: "编码",
            component: "el-select",
            options: [],
            bind: {
              filterable: true,
              "allow-create": true,
            },
            on: {
              focus: () => {
                const $el = this.form.items[this.form.items.findIndex((v) => v.prop === "slug")];
                selectQuoteCount({ type: "option", columns: ["slug"] }).then((res) => {
                  $el.options = res.rows.map((v) => ({ ...v, value: v.slug }));
                });
              },
            },
          },
          {
            prop: "type",
            label: "类型",
            component: "el-select",
            options: [],
            on: {
              focus: () => {
                const $el = this.form.items[this.form.items.findIndex((v) => v.prop === "type")];
                selectQuoteCount({ type: "option", slug: "default", columns: ["name", "description"] }).then((res) => {
                  $el.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
                });
              },
            },
          },
          {
            prop: "description",
            label: "描述",
            bind: {
              type: "textarea",
              autosize: true,
            },
          },
        ],
        key: "mid",
      },
    };
  },
  created() {},
  methods: {
    handleBack() {
      this.$router.push({ path: "/meta/list" });
    },
    requestInsertItem: insertQuoteItem,
    requestSelectItem: selectQuoteItem,
    requestUpdateItem: updateQuoteItem,
  },
};
</script>

<style lang="scss" scoped></style>
