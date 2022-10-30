<script>
import { selectLoggerList, selectLoggerCount } from "@/api/logger";
import { selectMetaCount } from "@/api/typecho";
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
          { type: "selection", width: 45 },
          {
            prop: "channel",
            label: "地址",
            width: 160,
            slotHeader: {
              component: "el-select",
              options: [],
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
            width: 150,
          },
          {
            prop: "value",
            label: "值",
          },
          { prop: "time", label: "时间", width: 160, filter: (val) => moment(val * 1000).format("YYYY-MM-DD HH:mm:ss") },
        ],
      },
    };
  },
  created() {
    selectLoggerCount({ columns: ["channel"] }).then((res) => {
      this.list.columns[this.list.columns.findIndex((v) => v.prop === "channel")].slotHeader.options = res.rows.map((v) => ({ ...v, value: v.channel }));
    });

    selectMetaCount({ type: "option", slug: "log.level", columns: ["mid", "name", "description"] }).then((res) => {
      this.list.columns[this.list.columns.findIndex((v) => v.prop === "level")].slotHeader.options = res.rows.map((v) => ({ ...v, value: v.name, label: v.description }));
    });
  },
  methods: {
    handleBack() {
      this.$router.push({ path: "/typecho/content" });
    },
    handleRowClick(row, column, event) {
      clipboard(row.value, event);
    },
    requestSelectList: selectLoggerList,
  },
};
</script>

<style lang="scss" scoped></style>
