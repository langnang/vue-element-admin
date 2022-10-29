import request, { post } from "@/utils/request";

/**
 * Typecho Option APIs
 */
export function typechoOptionInfo(data) {
  return request(
    {
      url: "/api/typecho/option/info",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoOptionList(data) {
  return request(
    {
      url: "/api/typecho/option/list",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function typechoOptionReplace(data) {
  return request(
    {
      url: "/api/typecho/option/replace",
      method: "POST",
      data,
    },
    { loading: true }
  );
}

/**
 * Typecho Meta APIs
 */

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

export const selectMetaCount = (data) => post("/api/typecho/meta/count", data);

/**
 * Typecho Content APIs
 */

export function insertContentItem(data) {
  return request(
    {
      url: "/api/typecho/content/insert",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function deleteContentList(data) {
  return request(
    {
      url: "/api/typecho/content/delete",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function updateContentItem(data) {
  return request(
    {
      url: "/api/typecho/content/update",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function selectContentItem(data) {
  return request(
    {
      url: "/api/typecho/content/info",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
export function selectContentList(data) {
  return request(
    {
      url: "/api/typecho/content/list",
      method: "POST",
      data,
    },
    { loading: true }
  );
}
