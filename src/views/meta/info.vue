<script>
import { insertMetaItem, selectMetaItem, updateMetaItem } from "@/api/meta";
import ElViewForm from "@/components/ElementView/ElViewForm";
export default {
  extends: ElViewForm,
  data() {
    return {
      form: {
        items: [
          { prop: "name", label: "标题" },
          { prop: "slug", label: "编码" },
          {
            prop: "type",
            label: "类型",
            component: "el-select",
            options: [],
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
