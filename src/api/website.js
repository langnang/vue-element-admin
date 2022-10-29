import request from "@/utils/request";

export function crawler_website_info(data) {
  return request({
    url: "/api/website/crawler",
    method: "GET",
    params: data,
  });
}

export function insert_website(data) {
  return request({
    url: "/api/website/insert",
    method: "POST",
    data,
  });
}
export function delete_website(data) {
  return request({
    url: "/api/website/delete",
    method: "POST",
    data,
  });
}
export function update_website(data) {
  return request({
    url: "/api/website/update",
    method: "POST",
    data,
  });
}

export function select_website_info(data) {}
export function select_website_list(data) {
  return request({
    url: "/api/website/list",
    method: "POST",
    data,
  });
}

export const upload_website = "/website/upload";

export const select_website_keywords = (keyword = "") =>
  request({
    url: "/api/website/keywords",
    method: "POST",
    data: {
      keyword,
    },
  });
