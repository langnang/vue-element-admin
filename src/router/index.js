import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
// import LayoutMain from "@/layout/components/AppMain";

/* Router Modules */
// import componentsRouter from "./modules/components";
// import chartsRouter from "./modules/charts";
// import tableRouter from "./modules/table";
// import nestedRouter from "./modules/nested";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/documentation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/documentation/index"),
        name: "Documentation",
        meta: { title: "Documentation", icon: "documentation", affix: true },
      },
    ],
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index"),
        name: "Guide",
        meta: { title: "Guide", icon: "guide", noCache: true },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/website",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/website/index"),
        name: "WebSite",
        meta: { title: "站点管理", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/public-api",
    component: Layout,
    redirect: "/public-api/list",
    // name: "Content",
    meta: { title: "接口管理", icon: "icon", noCache: true },
    children: [
      {
        path: "list",
        component: () => import("@/views/public-api/list"),
        name: "Content List",
        meta: { title: "接口列表", icon: "icon", noCache: true },
        hidden: true,
      },
      {
        path: "info",
        component: () => import("@/views/public-api/info"),
        name: "Content Info",
        meta: { title: "接口详情", icon: "icon", noCache: true },
        hidden: true,
      },
    ],
  },
  {
    path: "/content",
    component: Layout,
    // name: "Content",
    meta: { title: "文本管理", icon: "icon", noCache: true },
    children: [
      {
        path: "",
        component: () => import("@/views/content/index"),
        name: "Content",
        redirect: "/content/list",
        meta: { title: "文本管理", icon: ["fas", "blog"], noCache: true },
      },
      {
        path: "list",
        component: () => import("@/views/content/list"),
        name: "Content List",
        meta: { title: "文本列表", icon: "icon", noCache: true },
        hidden: true,
      },
      {
        path: "info",
        component: () => import("@/views/content/info"),
        name: "Content Info",
        meta: { title: "文本详情", icon: "icon", noCache: true },
        hidden: true,
      },
    ],
  },
  {
    path: "/meta",
    component: Layout,
    name: "Meta",
    meta: { title: "标识管理", icon: "el-icon-eleme", noCache: true },
    // name: "Meta",
    // meta: { title: "Meta", icon: "icon", noCache: true },
    children: [
      {
        path: "",
        component: () => import("@/views/meta/index"),
        name: "Meta",
        redirect: "/meta/list",
        meta: { title: "标识管理", icon: "el-icon-eleme", noCache: true },
      },
      {
        path: "list",
        component: () => import("@/views/meta/list"),
        name: "Meta List",
        meta: { title: "标识列表", icon: "icon", noCache: true },
        hidden: true,
      },
      {
        path: "info",
        component: () => import("@/views/meta/info"),
        name: "Meta Info",
        meta: { title: "标识详情", icon: "icon", noCache: true },
        hidden: true,
      },
    ],
  },

  { path: "/comment", component: Layout, meta: { title: "消息管理", icon: "message", noCache: true }, hidden: true },
  { path: "/user", component: Layout, meta: { title: "用户管理", icon: "el-icon-user-solid", noCache: true }, hidden: true },
  require("./modules/typecho")["default"],
  {
    path: "/quote",
    component: Layout,
    name: "Quote",
    redirect: "/quote/list",
    meta: { title: "语录管理", icon: "el-icon-eleme", noCache: true },
    children: [
      {
        path: "list",
        component: () => import("@/views/quote/list"),
        name: "Quote List",
        hidden: true,
      },
      {
        path: "info",
        component: () => import("@/views/quote/info"),
        name: "Quote Info",
        hidden: true,
      },
    ],
  },
  {
    path: "/phpspider",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/phpspider/index"),
        name: "PhpSpider",
        meta: { title: "爬虫管理", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/script",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/script/index"),
        name: "Script",
        meta: { title: "脚本管理", icon: "icon", noCache: true },
      },
    ],
  },

  /** when your routing map is too long, you can split it into small modules **/

  {
    path: "/logger",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/logger/index"),
        name: "Logger",
        meta: { title: "日志管理", icon: "bug", noCache: true },
      },
    ],
  },
  require("./modules/examples")["default"],

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
