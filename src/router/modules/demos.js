import Layout from "@/layout";
import LayoutMain from "@/layout/components/AppMain";

export default {
  path: "/demos",
  component: Layout,
  name: "Demo",
  redirect: "noRedirect",
  meta: { title: "Demos", icon: "icon" },
  children: [
    {
      path: "icon",
      component: LayoutMain,
      children: [
        {
          path: "",
          component: () => import("@/views/demo/icons/index"),
          name: "Icons",
          meta: { title: "Icons", icon: "icon", noCache: true },
        },
      ],
    },
    {
      path: "charts",
      component: LayoutMain,
      redirect: "noRedirect",
      name: "Charts",
      meta: {
        title: "Charts",
        icon: "chart",
      },
      children: [
        {
          path: "keyboard",
          component: () => import("@/views/demo/charts/keyboard"),
          name: "KeyboardChart",
          meta: { title: "Keyboard Chart", noCache: true },
        },
        {
          path: "line",
          component: () => import("@/views/demo/charts/line"),
          name: "LineChart",
          meta: { title: "Line Chart", noCache: true },
        },
        {
          path: "mix-chart",
          component: () => import("@/views/demo/charts/mix-chart"),
          name: "MixChart",
          meta: { title: "Mix Chart", noCache: true },
        },
      ],
    },
    {
      path: "nested",
      component: LayoutMain,
      redirect: "/nested/menu1/menu1-1",
      name: "Nested",
      meta: {
        title: "Nested Routes",
        icon: "nested",
      },
      children: [
        {
          path: "menu1",
          component: () => import("@/views/nested/menu1/index"), // Parent router-view
          name: "Menu1",
          meta: { title: "Menu 1" },
          redirect: "/nested/menu1/menu1-1",
          children: [
            {
              path: "menu1-1",
              component: () => import("@/views/nested/menu1/menu1-1"),
              name: "Menu1-1",
              meta: { title: "Menu 1-1" },
            },
            {
              path: "menu1-2",
              component: () => import("@/views/nested/menu1/menu1-2"),
              name: "Menu1-2",
              redirect: "/nested/menu1/menu1-2/menu1-2-1",
              meta: { title: "Menu 1-2" },
              children: [
                {
                  path: "menu1-2-1",
                  component: () => import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                  name: "Menu1-2-1",
                  meta: { title: "Menu 1-2-1" },
                },
                {
                  path: "menu1-2-2",
                  component: () => import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                  name: "Menu1-2-2",
                  meta: { title: "Menu 1-2-2" },
                },
              ],
            },
            {
              path: "menu1-3",
              component: () => import("@/views/nested/menu1/menu1-3"),
              name: "Menu1-3",
              meta: { title: "Menu 1-3" },
            },
          ],
        },
        {
          path: "menu2",
          name: "Menu2",
          component: () => import("@/views/nested/menu2/index"),
          meta: { title: "Menu 2" },
        },
      ],
    },
    {
      path: "table",
      component: LayoutMain,
      redirect: "/table/complex-table",
      name: "Table",
      meta: {
        title: "Table",
        icon: "table",
      },
      children: [
        {
          path: "dynamic-table",
          component: () => import("@/views/table/dynamic-table/index"),
          name: "DynamicTable",
          meta: { title: "Dynamic Table" },
        },
        {
          path: "drag-table",
          component: () => import("@/views/table/drag-table"),
          name: "DragTable",
          meta: { title: "Drag Table" },
        },
        {
          path: "inline-edit-table",
          component: () => import("@/views/table/inline-edit-table"),
          name: "InlineEditTable",
          meta: { title: "Inline Edit" },
        },
        {
          path: "complex-table",
          component: () => import("@/views/table/complex-table"),
          name: "ComplexTable",
          meta: { title: "Complex Table" },
        },
      ],
    },
    {
      path: "example",
      component: LayoutMain,
      redirect: "/example/list",
      name: "Example",
      meta: {
        title: "Example",
        icon: "el-icon-s-help",
      },
      children: [
        {
          path: "create",
          component: () => import("@/views/example/create"),
          name: "CreateArticle",
          meta: { title: "Create Article", icon: "edit" },
        },
        {
          path: "edit/:id(\\d+)",
          component: () => import("@/views/example/edit"),
          name: "EditArticle",
          meta: { title: "Edit Article", noCache: true, activeMenu: "/example/list" },
          hidden: true,
        },
        {
          path: "list",
          component: () => import("@/views/example/list"),
          name: "ArticleList",
          meta: { title: "Article List", icon: "list" },
        },
      ],
    },

    {
      path: "tab",
      component: LayoutMain,
      children: [
        {
          path: "index",
          component: () => import("@/views/tab/index"),
          name: "Tab",
          meta: { title: "Tab", icon: "tab" },
        },
      ],
    },

    {
      path: "error",
      component: LayoutMain,
      redirect: "noRedirect",
      name: "ErrorPages",
      meta: {
        title: "Error Pages",
        icon: "404",
      },
      children: [
        {
          path: "401",
          component: () => import("@/views/error-page/401"),
          name: "Page401",
          meta: { title: "401", noCache: true },
        },
        {
          path: "404",
          component: () => import("@/views/error-page/404"),
          name: "Page404",
          meta: { title: "404", noCache: true },
        },
      ],
    },

    {
      path: "error-log",
      component: LayoutMain,
      children: [
        {
          path: "log",
          component: () => import("@/views/error-log/index"),
          name: "ErrorLog",
          meta: { title: "Error Log", icon: "bug" },
        },
      ],
    },

    {
      path: "excel",
      component: LayoutMain,
      redirect: "/excel/export-excel",
      name: "Excel",
      meta: {
        title: "Excel",
        icon: "excel",
      },
      children: [
        {
          path: "export-excel",
          component: () => import("@/views/excel/export-excel"),
          name: "ExportExcel",
          meta: { title: "Export Excel" },
        },
        {
          path: "export-selected-excel",
          component: () => import("@/views/excel/select-excel"),
          name: "SelectExcel",
          meta: { title: "Export Selected" },
        },
        {
          path: "export-merge-header",
          component: () => import("@/views/excel/merge-header"),
          name: "MergeHeader",
          meta: { title: "Merge Header" },
        },
        {
          path: "upload-excel",
          component: () => import("@/views/excel/upload-excel"),
          name: "UploadExcel",
          meta: { title: "Upload Excel" },
        },
      ],
    },

    {
      path: "zip",
      component: LayoutMain,
      redirect: "/zip/download",
      alwaysShow: true,
      name: "Zip",
      meta: { title: "Zip", icon: "zip" },
      children: [
        {
          path: "download",
          component: () => import("@/views/zip/index"),
          name: "ExportZip",
          meta: { title: "Export Zip" },
        },
      ],
    },

    {
      path: "pdf",
      component: LayoutMain,
      redirect: "/pdf/index",
      children: [
        {
          path: "index",
          component: () => import("@/views/pdf/index"),
          name: "PDF",
          meta: { title: "PDF", icon: "pdf" },
        },
      ],
    },
    {
      path: "pdf/download",
      component: () => import("@/views/pdf/download"),
      hidden: true,
    },

    {
      path: "theme",
      component: LayoutMain,
      children: [
        {
          path: "index",
          component: () => import("@/views/theme/index"),
          name: "Theme",
          meta: { title: "Theme", icon: "theme" },
        },
      ],
    },

    {
      path: "clipboard",
      component: LayoutMain,
      children: [
        {
          path: "index",
          component: () => import("@/views/clipboard/index"),
          name: "ClipboardDemo",
          meta: { title: "Clipboard", icon: "clipboard" },
        },
      ],
    },

    {
      path: "external-link",
      component: LayoutMain,
      children: [
        {
          path: "https://github.com/PanJiaChen/vue-element-admin",
          meta: { title: "External Link", icon: "link" },
        },
      ],
    },
  ],
};
