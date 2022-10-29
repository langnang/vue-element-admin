import request from "@/utils/request";

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

export * from "./post";
export * from "./meta";
