<script>
import { insertContentItem, selectContentItem, updateContentItem } from "@/api/typecho";
import ElViewForm from "@/components/ElementView/ElViewForm";
export default {
  extends: ElViewForm,
  data() {
    return {
      form: {
        items: [
          { prop: "title", label: "标题" },
          { prop: "slug", label: "编码" },
          {
            prop: "text",
            label: "内容",
            bind: {
              type: "textarea",
            },
          },
        ],
        key: "cid",
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/typecho/content/list" });
    },
    requestInsertItem: insertContentItem,
    requestSelectItem: selectContentItem,
    requestUpdateItem: updateContentItem,
  },
};
</script>

<style lang="scss" scoped></style>
