import { getToken } from "@/utils/auth";

export default {
  name: "PageableDataTable",
  data() {
    return {
      token: getToken(),
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
      select_list().then(res => {

      })
    }
  }
};
