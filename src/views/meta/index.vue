<script>
import HomeTemplate from "@/templates/home";
import { selectMetaCount, selectMetaList } from "@/api/meta";
export default {
  extends: HomeTemplate,
  data() {
    return {};
  },
  computed: {
    span() {
      return 3;
    },
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      this.loading = true;
      Promise.all([selectMetaList({ type: "default", size: Number.MAX_SAFE_INTEGER }), selectMetaCount({ columns: ["type"] })])
        .then((res) => {
          const list = [...res[0].rows].map(function (row) {
            row._count = [...res[1].rows].find((v) => v.type === row.name)?._count || 0;
            row.to = {
              path: "/meta/list",
              query: {
                parent: row.mid,
              },
            };
            row.label = row.name;
            return row;
          });
          this.list.data = [
            ...list,
            {
              icon: "el-icon-plus",
              to: {
                path: "/meta/info",
                query: {
                  type: "default",
                },
              },
            },
          ];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="sass" scoped></style>
