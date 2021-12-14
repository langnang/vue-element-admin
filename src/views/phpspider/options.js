export const originItem = {
  title: null,
  domains: null,
  scan_urls: null,
  list_url_regexes: null,
  content_url_regexes: null,
  fields: null,
  status: null,
  type: null,
};

export const pageableTable = {
  cols: [
    {
      type: "selection",
      width: "45"
    },
    {
      prop: "title",
      label: "标题",
      width: "160"
    },
    {
      prop: "domains",
      label: "域名",
      width: "200"
    },
    {
      prop: "content_url_regexes",
      label: "内容页URL规则",
    },

    {
      prop: "order",
      label: "排序",
      width: "60"
    },
    {
      prop: "type",
      label: "类别",
      width: "60",
      isSlot: true,
    },
    {
      prop: "status",
      label: "状态",
      width: "60",
      isSlot: true,
    },
    {
      prop: "content_count",
      label: "抽取数",
      width: "60",
      isSlot: true,
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
