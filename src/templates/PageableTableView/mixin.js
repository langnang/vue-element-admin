import InlineForm from './components/InlineForm'
import PageableTable from './components/PageableTable'
import RowForm from './components/RowForm'
import { getToken } from "@/utils/auth";

export default {
  name: "PageableDataTable",
  components: { InlineForm, PageableTable, RowForm },
  data() {
    return {
      token: getToken(),
      api_path: 'index',
      form: {},
      table: {
        loading: false,
        data: [],
        multipleSelection: [],
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      dialog: {
        title: "",
        visible: false,
        target: "", //insert update
        form: {},
      },
    };
  },
  methods: {
    handleSelect() { },
    handleReset() { },
    handleUpdate() { },
    handleDelete() {
      delete_item()
    },
    getList() {
      this.table.loading = true;
      this.select_list({
        ...this.form,
        ...this.pagination,
      })
        .then((res) => {
          this.table.data = res.rows;
          this.pagination.total = res.total;
          this.pagination.page = res.page;
          this.pagination.size = res.size;
        })
        .finally(() => {
          this.table.loading = false;
        });
    },
  }
};
