import Layout from "@/layout";
import LayoutMain from "@/layout/components/AppMain";

export default {
  path: "/typecho",
  component: Layout,
  name: "Typecho",
  redirect: "noRedirect",
  meta: { title: "Typecho", icon: "icon" },
  children: [
    {
      path: "meta",
      // name: "Typecho Meta",
      component: LayoutMain,
      // redirect: "/typecho/meta/index",
      // meta: { title: "Meta", noCache: true },
      children: [
        {
          path: "",
          component: () => import("@/views/typecho/meta/index"),
          name: "Typecho Meta",
          meta: { title: "Meta", noCache: true },
        },
        {
          path: "list",
          component: () => import("@/views/typecho/meta/list"),
          name: "Typecho Meta List",
          meta: { title: "Meta List", noCache: true },
          hidden: true,
        },
        {
          path: "info",
          component: () => import("@/views/typecho/meta/info"),
          name: "Typecho Meta Info",
          meta: { title: "Meta Info", noCache: true },
          hidden: true,
        },
      ],
    },
    {
      path: "content",
      // name: "Typecho Meta",
      component: LayoutMain,
      // redirect: "/typecho/meta/index",
      // meta: { title: "Meta", noCache: true },
      children: [
        {
          path: "",
          component: () => import("@/views/typecho/content/index"),
          name: "Typecho Content",
          meta: { title: "Content", noCache: true },
        },
        {
          path: "list",
          component: () => import("@/views/typecho/content/list"),
          name: "Typecho Content List",
          meta: { title: "Content List", noCache: true },
          hidden: true,
        },
        {
          path: "info",
          component: () => import("@/views/typecho/content/info"),
          name: "Typecho Content Info",
          meta: { title: "Content Info", noCache: true },
          hidden: true,
        },
      ],
    },
  ],
};
