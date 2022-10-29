import request from "@/utils/request";

export function typechoMetaInsert(data) {
  return request(
    {
      url: "/api/typecho/meta/insert",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoMetaDelete(data) {
  return request(
    {
      url: "/api/typecho/meta/delete",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoMetaUpdate(data) {
  return request(
    {
      url: "/api/typecho/meta/update",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoMetaInfo(data) {
  return request(
    {
      url: "/api/typecho/meta/info",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoMetaList(data) {
  return request(
    {
      url: "/api/typecho/meta/list",
      method: "post",
      data,
    },
    { loading: true }
  );
}
export function typechoMetaTree(data) {
  return request(
    {
      url: "/api/typecho/meta/tree",
      method: "POST",
      data,
    },
    { loading: true }
  );
}

export function typechoMetaTypeList(data) {
  return request(
    {
      url: "/api/typecho/meta/type",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
