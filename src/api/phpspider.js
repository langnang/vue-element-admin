import request from "@/utils/request";

export const select_phpspider_options = () =>
  request({
    url: "/api/phpspider/options",
    method: "GET",
  });

export function test_phpspider(data) {
  return request({
    url: "/api/phpspider/test",
    method: "POST",
    data,
  });
}

export function insert_phpspider(data) {
  return request({
    url: "/api/phpspider/insert",
    method: "POST",
    data,
  });
}
export function delete_phpspider(data) {
  return request({
    url: "/api/phpspider/delete",
    method: "POST",
    data,
  });
}
export function update_phpspider(data) {
  return request({
    url: "/api/phpspider/update",
    method: "POST",
    data,
  });
}

export function select_phpspider_info(data) {}
export function select_phpspider_list(data) {
  return request({
    url: "/api/phpspider/list",
    method: "POST",
    data,
  });
}

export function select_phpspider_content_list(data) {
  return request({
    url: "/api/phpspider/content/list",
    method: "POST",
    data,
  });
}

export const upload_phpspider = "/phpspider/upload";

export const select_phpspider_keywords = (keyword = "") =>
  request({
    url: "/api/phpspider/keywords",
    method: "POST",
    data: {
      keyword,
    },
  });
