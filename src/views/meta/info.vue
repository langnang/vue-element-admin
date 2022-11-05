<script>
import { getMetaConfig, insertMetaItem, selectMetaItem, updateMetaItem, selectMetaCount } from "@/api/meta";
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
            bind: {
              "allow-create": true,
            },
            on: {
              focus: () => {
                const $el = this.form.items[this.form.items.findIndex((v) => v.prop === "type")];
                selectMetaCount({ type: "option", slug: "default", columns: ["name", "description"] }).then((res) => {
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
    handleBeforeSubmit() {
      console.log(this.form.data.type);
      return false;
    },
    requestInsertItem: insertMetaItem,
    requestSelectItem: selectMetaItem,
    requestUpdateItem: updateMetaItem,
  },
};
</script>

<style lang="scss" scoped></style>
