import { getToken } from "@/utils/auth";
import SelectInlineFrom from './components/SelectInlineForm'
import PageableTable from './components/PageableTable'
import RightButtonGroup from './components/RightButtonGroup'
import RowForm from './components/RowForm'

export default {
  name: "PageableDataTable",
  components: { SelectInlineFrom, RightButtonGroup, PageableTable, RowForm },
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
