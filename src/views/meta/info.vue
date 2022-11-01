<script>
import { insertMetaItem, selectMetaItem, updateMetaItem, selectMetaCount } from "@/api/meta";
import ElViewForm from "@/components/ElementView/ElViewForm";
export default {
  extends: ElViewForm,
  data() {
    return {
      form: {
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
                selectMetaCount({ type: "option", columns: ["slug"] }).then((res) => {
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
                selectMetaCount({ type: "option", slug: "default", columns: ["id", "name", "description"] }).then((res) => {
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
        key: "id",
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/meta/list" });
    },
    requestInsertItem: insertMetaItem,
    requestSelectItem: selectMetaItem,
    requestUpdateItem: updateMetaItem,
  },
};
</script>

<style lang="scss" scoped></style>
