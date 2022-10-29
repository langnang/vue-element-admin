import request from "@/utils/request";

export function crawler_script_info(data) {
  return request({
    url: "/api/script/crawler",
    method: "GET",
    params: data,
  });
}

export function insert_script(data) {
  return request({
    url: "/api/script/insert",
    method: "POST",
    data,
  });
}
export function delete_script(data) {
  return request({
    url: "/api/script/delete",
    method: "POST",
    data,
  });
}
export function update_script(data) {
  return request({
    url: "/api/script/update",
    method: "POST",
    data,
  });
}

export function select_script_info(data) {}
export function select_script_list(data) {
  return request({
    url: "/api/script/list",
    method: "POST",
    data,
  });
}

export const upload_script = "/script/upload";

export const select_script_keywords = (keyword = "") =>
  request({
    url: "/api/script/keywords",
    method: "POST",
    data: {
      keyword,
    },
  });
