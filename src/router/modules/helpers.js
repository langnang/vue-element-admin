/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const chartsRouter = {
  path: "/helpers",
  component: Layout,
  redirect: "noRedirect",
  name: "Helpers",
  meta: {
    title: "Helpers",
    icon: "chart",
  },
  children: [],
};

export default chartsRouter;
