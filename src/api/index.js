import request, { post } from "@/utils/request";

export const jsdelivr = (pkg, version) =>
  request({
    method: "GET",
    url: `https://data.jsdelivr.com/v1/package/npm/${pkg}@${version}`,
  });

export const proxyRequest = (data) => post("/api/request", data);
