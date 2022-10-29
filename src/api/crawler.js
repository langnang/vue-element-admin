import request from "@/utils/request";

export const crawlerPostTest = (data) => {
  return request(
    {
      url: "/api/crawler/test",
      method: "POST",
      data,
    },
    { loading: true }
  );
};
export const crawlerPostInsert = (data) => {
  return request(
    {
      url: "/api/crawler/insert",
      method: "POST",
      data,
    },
    { loading: true }
  );
};
export const crawlerPostDelete = (data) => {
  return request(
    {
      url: "/api/crawler/delete",
      method: "POST",
      data,
    },
    { loading: true }
  );
};
export const crawlerPostUpdate = (data) => {
  return request(
    {
      url: "/api/crawler/update",
      method: "POST",
      data,
    },
    { loading: true }
  );
};
export const crawlerPostList = (data) => {
  return request(
    {
      url: "/api/crawler/list",
      method: "POST",
      data,
    },
    { loading: true }
  );
};

export const crawlerPostInfo = (data) => {
  return request(
    {
      url: "/api/crawler/info",
      method: "POST",
      data,
    },
    { loading: true }
  );
};
