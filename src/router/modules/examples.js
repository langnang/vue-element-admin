import Layout from "@/layout";
import LayoutMain from "@/layout/components/AppMain";

export default {
  path: "/examples",
  component: Layout,
  name: "Example",
  redirect: "noRedirect",
  meta: { title: "组件示例", icon: "icon" },
  children: [
    {
      path: "api-form",
      component: () => import("@/examples/api-form"),
      name: "ApiForm",
      meta: { title: "接口", icon: "icon", noCache: true },
    },
    {
      path: "icon",
      component: LayoutMain,
      children: [
        {
          path: "",
          component: () => import("@/examples/icons/index"),
          name: "Icons",
          meta: { title: "图标", icon: "icon", noCache: true },
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
          component: () => import("@/examples/charts/keyboard"),
          name: "KeyboardChart",
          meta: { title: "Keyboard Chart", noCache: true },
        },
        {
          path: "line",
          component: () => import("@/examples/charts/line"),
          name: "LineChart",
          meta: { title: "Line Chart", noCache: true },
        },
        {
          path: "mix-chart",
          component: () => import("@/examples/charts/mix-chart"),
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
          component: () => import("@/examples/nested/menu1/index"), // Parent router-view
          name: "Menu1",
          meta: { title: "Menu 1" },
          redirect: "/nested/menu1/menu1-1",
          children: [
            {
              path: "menu1-1",
              component: () => import("@/examples/nested/menu1/menu1-1"),
              name: "Menu1-1",
              meta: { title: "Menu 1-1" },
            },
            {
              path: "menu1-2",
              component: () => import("@/examples/nested/menu1/menu1-2"),
              name: "Menu1-2",
              redirect: "/nested/menu1/menu1-2/menu1-2-1",
              meta: { title: "Menu 1-2" },
              children: [
                {
                  path: "menu1-2-1",
                  component: () => import("@/examples/nested/menu1/menu1-2/menu1-2-1"),
                  name: "Menu1-2-1",
                  meta: { title: "Menu 1-2-1" },
                },
                {
                  path: "menu1-2-2",
                  component: () => import("@/examples/nested/menu1/menu1-2/menu1-2-2"),
                  name: "Menu1-2-2",
                  meta: { title: "Menu 1-2-2" },
                },
              ],
            },
            {
              path: "menu1-3",
              component: () => import("@/examples/nested/menu1/menu1-3"),
              name: "Menu1-3",
              meta: { title: "Menu 1-3" },
            },
          ],
        },
        {
          path: "menu2",
          name: "Menu2",
          component: () => import("@/examples/nested/menu2/index"),
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
          component: () => import("@/examples/table/dynamic-table/index"),
          name: "DynamicTable",
          meta: { title: "Dynamic Table" },
        },
        {
          path: "drag-table",
          component: () => import("@/examples/table/drag-table"),
          name: "DragTable",
          meta: { title: "Drag Table" },
        },
        {
          path: "inline-edit-table",
          component: () => import("@/examples/table/inline-edit-table"),
          name: "InlineEditTable",
          meta: { title: "Inline Edit" },
        },
        {
          path: "complex-table",
          component: () => import("@/examples/table/complex-table"),
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
          component: () => import("@/examples/example/create"),
          name: "CreateArticle",
          meta: { title: "Create Article", icon: "edit" },
        },
        {
          path: "edit/:id(\\d+)",
          component: () => import("@/examples/example/edit"),
          name: "EditArticle",
          meta: { title: "Edit Article", noCache: true, activeMenu: "/example/list" },
          hidden: true,
        },
        {
          path: "list",
          component: () => import("@/examples/example/list"),
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
          component: () => import("@/examples/tab/index"),
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
          component: () => import("@/views/error/401"),
          name: "Page401",
          meta: { title: "401", noCache: true },
        },
        {
          path: "404",
          component: () => import("@/views/error/404"),
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
          component: () => import("@/examples/error-log/index"),
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
        title: "表格",
        icon: "excel",
      },
      children: [
        {
          path: "export-excel",
          component: () => import("@/examples/excel/export-excel"),
          name: "ExportExcel",
          meta: { title: "Export Excel" },
        },
        {
          path: "export-selected-excel",
          component: () => import("@/examples/excel/select-excel"),
          name: "SelectExcel",
          meta: { title: "Export Selected" },
        },
        {
          path: "export-merge-header",
          component: () => import("@/examples/excel/merge-header"),
          name: "MergeHeader",
          meta: { title: "Merge Header" },
        },
        {
          path: "upload-excel",
          component: () => import("@/examples/excel/upload-excel"),
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
      meta: { title: "压缩文件", icon: "zip" },
      children: [
        {
          path: "download",
          component: () => import("@/examples/zip/index"),
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
          component: () => import("@/examples/pdf/index"),
          name: "PDF",
          meta: { title: "PDF", icon: "pdf" },
        },
      ],
    },
    {
      path: "pdf/download",
      component: () => import("@/examples/pdf/download"),
      hidden: true,
    },

    {
      path: "theme",
      component: LayoutMain,
      children: [
        {
          path: "index",
          component: () => import("@/examples/theme/index"),
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
          component: () => import("@/examples/clipboard/index"),
          name: "ClipboardDemo",
          meta: { title: "Clipboard", icon: "clipboard" },
        },
      ],
    },
    {
      path: "permission",
      component: Layout,
      redirect: "permission/page",
      alwaysShow: true, // will always show the root menu
      name: "Permission",
      meta: {
        title: "Permission",
        icon: "lock",
        roles: ["admin", "editor"], // you can set roles in root nav
      },
      children: [
        {
          path: "page",
          component: () => import("@/examples/permission/page"),
          name: "PagePermission",
          meta: {
            title: "Page Permission",
            roles: ["admin"], // or you can only set roles in sub nav
          },
        },
        {
          path: "directive",
          component: () => import("@/examples/permission/directive"),
          name: "DirectivePermission",
          meta: {
            title: "Directive Permission",
            // if do not set roles, means: this page does not require permission
          },
        },
        {
          path: "role",
          component: () => import("@/examples/permission/role"),
          name: "RolePermission",
          meta: {
            title: "Role Permission",
            roles: ["admin"],
          },
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
    {
      path: "code-mirror",
      component: () => import("@/examples/code-mirror-editor"),
      name: "CodeMirrorEditor",
      meta: { title: "CodeMirrorEditor" },
    },
    {
      path: "tinymce",
      component: () => import("@/examples/tinymce"),
      name: "TinymceDemo",
      meta: { title: "Tinymce" },
    },
    {
      path: "markdown",
      component: () => import("@/examples/markdown"),
      name: "MarkdownDemo",
      meta: { title: "Markdown" },
    },
    {
      path: "json-editor",
      component: () => import("@/examples/json-editor"),
      name: "JsonEditorDemo",
      meta: { title: "JSON Editor" },
    },
    {
      path: "split-pane",
      component: () => import("@/examples/split-pane"),
      name: "SplitpaneDemo",
      meta: { title: "SplitPane" },
    },
    {
      path: "avatar-upload",
      component: () => import("@/examples/avatar-upload"),
      name: "AvatarUploadDemo",
      meta: { title: "Upload" },
    },
    {
      path: "dropzone",
      component: () => import("@/examples/dropzone"),
      name: "DropzoneDemo",
      meta: { title: "Dropzone" },
    },
    {
      path: "sticky",
      component: () => import("@/examples/sticky"),
      name: "StickyDemo",
      meta: { title: "Sticky" },
    },
    {
      path: "count-to",
      component: () => import("@/examples/count-to"),
      name: "CountToDemo",
      meta: { title: "Count To" },
    },
    {
      path: "mixin",
      component: () => import("@/examples/mixin"),
      name: "ComponentMixinDemo",
      meta: { title: "Component Mixin" },
    },
    {
      path: "back-to-top",
      component: () => import("@/examples/back-to-top"),
      name: "BackToTopDemo",
      meta: { title: "Back To Top" },
    },
    {
      path: "drag-dialog",
      component: () => import("@/examples/drag-dialog"),
      name: "DragDialogDemo",
      meta: { title: "Drag Dialog" },
    },
    {
      path: "drag-select",
      component: () => import("@/examples/drag-select"),
      name: "DragSelectDemo",
      meta: { title: "Drag Select" },
    },
    {
      path: "dnd-list",
      component: () => import("@/examples/dnd-list"),
      name: "DndListDemo",
      meta: { title: "Dnd List" },
    },
    {
      path: "drag-kanban",
      component: () => import("@/examples/drag-kanban"),
      name: "DragKanbanDemo",
      meta: { title: "Drag Kanban" },
    },
  ],
};
