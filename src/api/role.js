import request from "@/utils/request";
const roles = [
  {
    key: "admin",
    name: "admin",
    description: "Super Administrator. Have access to view all pages.",
    routes: routes,
  },
  {
    key: "editor",
    name: "editor",
    description: "Normal Editor. Can see all pages except permission page",
    routes: routes.filter((i) => i.path !== "/permission"), // just a mock
  },
  {
    key: "visitor",
    name: "visitor",
    description: "Just a visitor. Can only see the home page and the document page",
    routes: [
      {
        path: "",
        redirect: "dashboard",
        children: [
          {
            path: "dashboard",
            name: "Dashboard",
            meta: { title: "dashboard", icon: "dashboard" },
          },
        ],
      },
    ],
  },
];
export function getRoutes() {
  return request({
    url: "/vue-element-admin/routes",
    method: "get",
  });
}

export function getRoles() {
  return Promise.resolve({
    status: 200,
    data: roles,
  });
  return request({
    url: "/vue-element-admin/roles",
    method: "get",
  });
}

export function addRole(data) {
  return request({
    url: "/vue-element-admin/role",
    method: "post",
    data,
  });
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: "put",
    data,
  });
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: "delete",
  });
}
