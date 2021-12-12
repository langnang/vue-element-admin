export const originItem = {
  title: null,
  keywords: null,
  description: null,
  language: null,
  content: null,
  status: null,
  type: null,
};


export const inlineForm = {
  value: Object.assign({}, originItem),
  cols: [
    {
      item: {
        prop: 'title',
      },
      component: {
        is: 'el-input',
        placeholder: '标题',
      }
    },
    {
      item: {
        prop: 'keywords',
      },
      component: {
        is: 'el-input',
        placeholder: '关键字',
      }
    },
  ],
  rightItem: [
    {
      operate: "insert",
      tooltip: {
        content: "新增"
      },
      component: {
      },
    },
    {
      operate: "delete",
      tooltip: {
        content: "删除"
      },
      component: {},
    },
    {
      operate: "upload",
      tooltip: {
        content: "上传"
      },
      component: {},
    },
    {
      operate: "download",
      tooltip: {
        content: "下载"
      },
      component: {},
    },
  ],
}

export const pageableTable = {
  cols: [
    {
      type: "selection",
      width: "45"
    },
    {
      prop: "title",
      label: "标题",
      width: "350"
    },
    {
      prop: "keywords",
      label: "关键字",
      width: "200"
    },
    {
      prop: "description",
      label: "描述",
    },
    {
      prop: "order",
      label: "排序",
      width: "80"
    },
    {
      prop: "type",
      label: "类别",
      width: "80"
    },
    {
      prop: "status",
      label: "状态",
      width: "80"
    },
    {
      prop: "create_time",
      label: "创建时间",
      width: "140"
    },
    {
      prop: "update_time",
      label: "更新时间",
      width: "140"
    },
  ],
}

export const rowForm = {
  loading: false,
  value: Object.assign({}, originItem),
  'label-width': '80px',
  cols: [
    {
      item: {
        prop: 'title',
        label: '标题',
      },
      component: {
        is: 'el-input',
      }
    },
    {
      item: {
        prop: 'keywords',
        label: '关键字',
      },
      component: {
        is: 'el-input',
      }
    },
    {
      item: {
        prop: 'description',
        label: '描述',
      },
      component: {
        is: 'el-input',
        type: 'textarea',
      }
    },
  ],

  rules: {
    title: [{
      required: true, trigger: 'blur'
    }]
  }
}
