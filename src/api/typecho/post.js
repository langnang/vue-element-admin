import request from "@/utils/request";
export function typechoPostInsert(data) {
  return request(
    {
      url: "/api/typecho/post/insert",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoPostDelete(data) {
  return request(
    {
      url: "/api/typecho/post/delete",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoPostUpdate(data) {
  return request(
    {
      url: "/api/typecho/post/update",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoPostInfo(data) {
  return request(
    {
      url: "/api/typecho/post/info",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoPostList(data) {
  return request(
    {
      url: "/api/typecho/post/list",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
