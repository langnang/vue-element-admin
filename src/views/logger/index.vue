<script>
import { selectLoggerList, selectLoggerCount } from "@/api/logger";
import { selectMetaCount } from "@/api/meta";
import ElViewTable from "@/components/ElementView/ElViewTable.vue";
import moment from "moment";
import clipboard from "@/utils/clipboard";
export default {
  extends: ElViewTable,
  data() {
    return {
      form: {
        key: "cid",
        deleteOperateKey: "cids",
        upload: {
          action: "http://localhost:9090/?/typecho/content/import",
          accept: ".xlsx",
        },
      },
      list: {
        columns: [
          {
            prop: "uuid",
            label: "通用唯一标识符",
            width: 240,
            slotHeader: {
              component: "el-input",
            },
          },
          {
            prop: "channel",
            label: "地址",
            width: 160,
            slotHeader: {
              component: "el-select",
              options: [],
              bind: {
                loading: false,
              },
              on: {
                focus: () => {
                  const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "channel")].slotHeader;
                  $el.bind.loading = true;
                  selectLoggerCount({ columns: ["channel"] })
                    .then((res) => {
                      $el.options = res.rows.map((v) => ({ ...v, value: v.channel }));
                    })
                    .finally(() => {
                      $el.bind.loading = false;
                    });
                },
              },
            },
          },
          {
            prop: "level",
            label: "类型",
            width: 150,
            slotHeader: {
              component: "el-select",
              options: [],
            },
            filter: (val, row, column) => column.slotHeader.options.find((v) => Number(v.value) === val)?.label,
          },
          {
            prop: "message",
            label: "消息",
            width: 320,
          },
          {
            prop: "var",
            label: "键",
            width: 180,
            slotHeader: {
              component: "el-select",
              options: [],
              bind: {
                loading: false,
              },
              on: {
                focus: () => {
                  const $el = this.list.columns[this.list.columns.findIndex((v) => v.prop === "var")].slotHeader;
                  $el.bind.loading = true;
                  selectLoggerCount({ columns: ["var"] })
                    .then((res) => {
                      $el.options = res.rows.map((v) => ({ ...v, value: v.var }));
                    })
                    .finally(() => {
                      $el.bind.loading = false;
                    });
                },
              },
            },
          },
          {
            prop: "value",
            label: "值",
          },
          { prop: "timestamp", label: "时间", width: 160, filter: (val) => moment(val).format("YYYY-MM-DD HH:mm:ss.SSS") },
        ],
      },
      to: {
        updateItem: () => ({}),
      },
    };
  },
  created() {
    selectMetaCount({ type: "option", slug: "log.level", columns: ["id", "name", "description"] }).then((res) => {
      this.list.columns[this.list.columns.findIndex((v) => v.prop === "level")].slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
    });
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/typecho/content" });
    },
    handleTableRowDblClick(row, column, event) {
      clipboard(row[column.property], event);
    },
    requestSelectList: selectLoggerList,
  },
};
</script>

<style lang="scss" scoped></style>
