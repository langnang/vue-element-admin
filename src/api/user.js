import request, { post } from "@/utils/request";
const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
  },
};
export function login(data) {
  const { username } = data;
  const token = tokens[username];
  return Promise.resolve({
    status: 200,
    data: token,
  });
  // return request({
  //   url:  "/user/login",
  //   method: "POST",
  //   data,
  // });
}

export function getInfo(data = {}) {
  const { token } = data;
  const info = users[token];

  // mock error
  if (!info) {
    return Promise.resolve({
      status: 50008,
      statusText: "Login failed, unable to get user details.",
    });
  }

  return Promise.resolve({
    status: 200,
    data: info,
  });
  // return request({
  //   url:  "/user/info",
  //   method: "POST",
  //   data,
  // });
}

export function logout() {
  return request({
    url: "/api/vue-element-admin/user/logout",
    method: "POST",
  });
}

export const insertUserItem = (data) => post("/api/user/insert", data);

export const deleteUserList = (data) => post("/api/user/delete", data);

export const updateUserItem = (data) => post("/api/user/update", data);

export const selectUserCount = (data) => post("/api/user/count", data);

export const selectUserList = (data) => post("/api/user/list", data);

export const selectUserTree = (data) => post("/api/user/tree", data);

export const selectUserItem = (data) => post("/api/user/info", data);
